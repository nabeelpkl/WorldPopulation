import {
  decorate, observable, when, flow, action, toJS, set, runInAction
} from "mobx";
import config from "../config/configs";


const server = config.get("SERVER_URL");

const normalizeErrors = (response) => {
  const errors = {};
  if (response.errors) {
    const remoteErrors = response.errors;
    if (remoteErrors.message) {
      errors.message = remoteErrors.message;
    }
    if (remoteErrors instanceof Array) {
      remoteErrors.forEach((error) => {
        const field = Object.keys(error).pop();
        const { type, message } = error[field];
        errors[field] = { message, type };
      });
    }
    response.errors = errors;
  }
  return response;
};

/**
 * @param {*} url : name of service
 * @param {*} aciton : service path
 * @param {*} data : { headers, authtoken, action: POST,PUT,GET,DELETE,HEAD data }
 * @param {*} headers
 */
export const request = async (url, action, data, headers = {}) => {// eslint-disable-line
  headers = Object.assign({ // eslint-disable-line
    "Content-type": "application/json",
  }, headers);
  const response = await fetch(url, { // eslint-disable-line no-undef
    method: action,
    body: JSON.stringify(data),
    headers,
  });
  let responseObject = null;
  if (action !== "HEAD") {
    responseObject = await response.json();
  }
  if (response.status >= 400) {
    const error = {
      response: normalizeErrors(responseObject),
      message: response.statusText,
      code: response.status,
      apiError: true,
    };
    throw error;
  }
  return responseObject;
};

class ApiRequest {
  constructor() {
    this.authTokenInfo = {};
    this.pendingRequests = [];
    this.pendingFailListeners = [];
    this.refreshingToken = false;
    this.tokenRefreshed = false;
    this.forceLogout = false;
    this.tokenRefreshedFailed = false;
    this.refreshAuthToken = flow(this.refreshAuthToken);
  }

  setAuthTokenInfo(authTokenInfo) {
    this.authTokenInfo = authTokenInfo;
  }

  makeUrl(serviceName, path) {
    return `${server}/${serviceName}/${path}`;
  }

  * refreshAuthToken() {
    try {
      this.tokenRefreshed = false;
      this.refreshingToken = true;
      this.pendingRequests = [];
      // dispose failed listners on successfull Refresh.
      const url = this.makeUrl(this.USER_SERVICE, "token/refresh");
      const headers = {
        Authorization: `Bearer ${this.authTokenInfo.refreshToken}`,
      };
      const response = yield request(url, "POST", { token: this.authTokenInfo.authToken }, headers);
      this.authTokenInfo = Object.assign({}, this.authTokenInfo, response);
      this.tokenRefreshed = true;
      this.refreshingToken = false;
      this.pendingFailListeners.forEach(re => re());
    } catch (e) {
      // dispose pending requests listners on successfull Refresh.
      this.pendingRequests.forEach(re => re());
      this.pendingRequests = [];
      this.tokenRefreshedFailed = true;
      this.pendingFailListeners = [];
      this.logoutUser();
    }
  }

  logoutUser() {
    this.forceLogout = true;
    this.authTokenInfo = {};
  }

  /**
   * @param {*} serviceName : name of service
   * @param {*} path : service path
   * @param {*} options : { headers, authtoken, action: POST,PUT,GET,DELETE,HEAD data }
   */
  request(serviceName, path, options = {}) {
    if (!this.authTokenInfo) {
      this.authTokenInfo = {};
    }
    if (this.refreshingToken) {
      return new Promise((resolve, reject) => {
        this.addAuthRefreshListners(() => {
          this.request(serviceName, path, options).then(resolve, reject);
        }, () => reject(new Error("Cannot complete request with failed tokens")));
      });
    }
    const url = this.makeUrl(serviceName, path);
    const headers = options.headers || {};
    if (this.authTokenInfo.authToken) {
      let authTokenExpired = false;
      let logoutUser = false;
      if (this.authTokenInfo.authTokenExpires < Date.now() - 1000) {
        authTokenExpired = true;
      }
      // expired see if we can fresh
      if (authTokenExpired) {
        if (!this.authTokenInfo.refreshToken || this.authTokenInfo.refreshTokenExpires < Date.now() - 1000 * 60) {
          logoutUser = true;
        } else {
          // refresh Auth token
          this.refreshAuthToken();
          // put request on hold
          return new Promise((resolve, reject) => {
            this.addAuthRefreshListners(() => {
              this.request(serviceName, path, options).then(resolve, reject);
            }, () => reject(new Error("Cannot complete request with failed tokens")));
          });
        }
      }
      if (logoutUser) {
        this.logoutUser();
        return new Promise((resolve, reject) => {
          reject(new Error({ message: "Session have expired" }));
        });
      }
      headers.Authorization = `Bearer ${this.authTokenInfo.authToken}`;
    }
    return request(url, options.action, options.data, headers);
  }

  addAuthRefreshListners(success, error) {
    this.pendingRequests.push(when(this.onTokenRefreshSelector(), () => {
      success();
    }));
    this.pendingFailListeners.push(when(this.onTokenRefreshFailedSelector(), () => {
      error();
    }));
  }

  onTokenRefreshSelector() {
    return () => {
      return this.tokenRefreshed && this.refreshingToken === false;
    };
  }

  onTokenRefreshFailedSelector() {
    return () => this.tokenRefreshed === false && this.tokenRefreshedFailed === true;
  }
}

ApiRequest.prototype.USER_SERVICE = "api/user";
ApiRequest.prototype.PRODUCT_SERVICE = "api/products";
ApiRequest.prototype.ORDER_SERVICE = "api/orders";
ApiRequest.prototype.CHANNEL_SERVICE = "api/channels";
ApiRequest.prototype.LAYOUT_SERVICE = "api/layouts";
ApiRequest.prototype.PACK_SERVICE = "api/packs";
ApiRequest.prototype.PLAN_SERVICE = "api/plans";
ApiRequest.prototype.LIVE_EVENT_SERVICE = "api/liveEvents";
ApiRequest.prototype.LIVE_TV_SERVICE = "api/programs";
ApiRequest.prototype.CONTENT_SERVICE = "api/content";
ApiRequest.prototype.OTP_SERVICE = "api/otp";
ApiRequest.prototype.CONFIGURATION_SERVICE = "api/configurations";
ApiRequest.prototype.PROMOTION_SERVICE = "api/promotions";
ApiRequest.prototype.SUBSCRIPTION_SERVICE = "api/subscriptions";
ApiRequest.prototype.VERSION_SERVICE = "api/version";
ApiRequest.prototype.COUNTER_SERVICE = "api/counter";


decorate(ApiRequest, {
  refreshingToken: observable,
  tokenRefreshed: observable,
  setAuthTokenInfo: action,
});

export default new ApiRequest();

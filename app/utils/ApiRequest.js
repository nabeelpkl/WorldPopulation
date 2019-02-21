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
    this.makeUrl = this.makeUrl.bind(this);
    this.request = this.request.bind(this);
  }
  makeUrl(serviceName, path) {
    return `${server}/${serviceName}/${path}`;
  }

  /**
   * @param {*} serviceName : name of service
   * @param {*} path : service path
   * @param {*} options : { headers, authtoken, action: POST,PUT,GET,DELETE,HEAD data }
   */
  request(serviceName, path, options = {}) {
    const url = this.makeUrl(serviceName, path);
    const headers = options.headers || {};
    return request(url, options.action, options.data, headers);
  }
}

export default new ApiRequest();

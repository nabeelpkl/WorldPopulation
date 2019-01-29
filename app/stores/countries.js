import { decorate, flow, observable, action } from "mobx";
import { ApiRequest } from "utils";

class Countries {
  constructor() {
    this.loading = false;
    this.loaded = false;
    this.countries = [];
    this.tempCountries = [];
    this.error = false;
    this.errorMessage = false;
    this.loadCountries = flow(this.loadCountries);
    this.onSearchCountries = this.onSearchCountries.bind(this);

  }

  * loadCountries() {
    try {
      this.loading = true;
      this.loaded = false;
      const response = yield ApiRequest.request("/countries", "", { action: "GET" });
      this.countries = response.countries;
      this.tempCountries = response.countries;
      this.loaded = true;
      this.loading = false;
    } catch (e) {
      this.loaded = true;
      this.loading = false;
      this.error = true;
      this.errorMessage = e.message;
    }
  }

  onSearchCountries(newData) {
    this.tempCountries = newData;
  }

}

decorate(Countries, {
  loaded: observable,
  loading: observable,
  contents: observable,
  tempCountries: observable,
  error: observable,
  onSearchCountries: action,
  errorMessage: observable,
});

export default new Countries();


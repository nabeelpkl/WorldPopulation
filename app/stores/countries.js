import { decorate, flow, observable } from "mobx";
import { ApiRequest } from "utils";

class Countries {
  constructor() {
    this.loading = false;
    this.loaded = false;
    this.countries = [];
    this.error = false;
    this.errorMessage = false;
    this.loadCountries = flow(this.loadCountries);
  }

  * loadCountries() {
    try {
      this.loading = true;
      this.loaded = false;
      const response = yield ApiRequest.request("/countries", "", { action: "GET" });
      this.countries = response.countries;
      this.loaded = true;
      this.loading = false;
    } catch (e) {
      this.loaded = true;
      this.loading = false;
      this.error = true;
      this.errorMessage = e.message;
    }
  }
}

decorate(Countries, {
  loaded: observable,
  loading: observable,
  contents: observable,
  error: observable,
  errorMessage: observable,
});

export default new Countries();


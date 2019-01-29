import { decorate, flow, observable } from "mobx";
import { ApiRequest } from "utils";

class Population {
  constructor(country) {
    this.loading = false;
    this.loaded = false;
    this.populationTable = [];
    this.path = `/${(new Date()).getFullYear()}/${country}`
    console.log("population store path", this.path);
    this.error = false;
    this.errorMessage = false;
    this.loadPopulation = flow(this.loadPopulation);

  }

  * loadPopulation() {
    try {
      this.loading = true;
      this.loaded = false;
      const response = yield ApiRequest.request("/population", this.path, { action: "GET" });
      this.populationTable = response;
      console.log("population response", this.populationTable);
      this.loaded = true;
      this.loading = false;
    } catch (e) {
      console.error("error", e);
      this.loaded = true;
      this.loading = false;
      this.error = true;
      this.errorMessage = e.message;
    }
  }
}

decorate(Population, {
  loaded: observable,
  loading: observable,
  contents: observable,
  error: observable,
  errorMessage: observable,
});

export default Population;


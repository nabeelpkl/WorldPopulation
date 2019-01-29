import { decorate } from "mobx";
import memoize from "fast-memoize";
import Population from "./population";


class PopulationDetails {
  constructor() {
    this.getPopulationByCountry = memoize(this.getPopulationByCountry.bind(this));
  }

  getPopulationByCountry(country) {
    return new Population(country);
  }
}

decorate(PopulationDetails, {
});

export default new PopulationDetails();


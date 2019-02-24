export const FETCH_POPULATION = "FETCH_POPULATION";
export const FETCH_POPULATION_RESULT = "FETCH_POPULATION_RESULT";
export const FETCH_POPULATION_ERROR = "FETCH_POPULATION_ERROR";

export const fetchPopulation = country => {
  return { type: FETCH_POPULATION, country };
}
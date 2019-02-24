import {
  FETCH_POPULATION,
  FETCH_POPULATION_RESULT,
  FETCH_POPULATION_ERROR,
} from '../actions/population';

const initialState = {
  isFetching: false,
  population: {
    table: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POPULATION:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_POPULATION_RESULT:
      return {
        ...state,
        isFetching: false,
        table: action.population,
        error: null,
      };
    case FETCH_POPULATION_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        table: [],
      };
    default:
      return state;
  }
}

export default reducer;
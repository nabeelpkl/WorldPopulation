import {
  GET_COUNTRIES_LIST,
  SEARCH_COUNTRY,
  GET_COUNTRIES_LIST_RESULT,
  GET_COUNTRIES_LIST_ERROR,
  SEARCH_COUNTRY_RESULT,
  getCountriesList,
  searchCountry,
} from '../actions/countries';

const initialState = {
  isFetching: false,
  countries: [],
  reducedCountries: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case SEARCH_COUNTRY:
      return {
        ...state,
      };
    case GET_COUNTRIES_LIST_RESULT:
      return {
        ...state,
        countries: action.countries,
        reducedCountries: action.countries,
        isFetching: false,
      };
    case GET_COUNTRIES_LIST_ERROR:
      return {
        ...state,
        countries: [],
        reducedCountries: [],
        isFetching: false,
      };
    case SEARCH_COUNTRY_RESULT:
      return {
        ...state,
        reducedCountries: action.countries,
      };
    default:
      return state;
  }
};

export default reducer;
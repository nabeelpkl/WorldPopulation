export const GET_COUNTRIES_LIST = "GET_COUNTRIES_LIST";
export const GET_COUNTRIES_LIST_RESULT = "GET_COUNTRIES_LIST_RESULT";
export const GET_COUNTRIES_LIST_ERROR = "GET_COUNTRIES_LIST_ERROR";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const SEARCH_COUNTRY_RESULT = "SEARCH_COUNTRY_RESULT";



export const getCountriesList = () => ({
  type: GET_COUNTRIES_LIST,
});

export const searchCountry = query => ({
  type: SEARCH_COUNTRY,
  query,
});
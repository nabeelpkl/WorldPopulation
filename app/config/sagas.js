import { takeEvery, call, put, select } from 'redux-saga/effects';
import { ApiRequest } from "utils";
import {
  GET_COUNTRIES_LIST,
  GET_COUNTRIES_LIST_ERROR,
  GET_COUNTRIES_LIST_RESULT,
  SEARCH_COUNTRY,
  SEARCH_COUNTRY_RESULT,
} from '../actions/countries';
import {
  FETCH_POPULATION,
  FETCH_POPULATION_RESULT,
  FETCH_POPULATION_ERROR,
} from '../actions/population';


function* fetchCountriesList(action) {
  try {
    console.log("TODO: update country list", action);
    const response = yield call(ApiRequest.request, "/countries", "", { action: "GET" });

    if (response) {
      yield put({ type: GET_COUNTRIES_LIST_RESULT, countries: response.countries });
    } else {
      yield put({ type: GET_COUNTRIES_LIST_ERROR, error: "something went wrong" });
    }
  } catch (e) {
    console.log("Saga error", e.message);
    yield put({ type: GET_COUNTRIES_LIST_ERROR, error: e.message });
  }
}

function* searchQuery(action) {
  const countries = yield select(state => state.countries.countries);
  const newData = countries.filter(item => {
    const itemData = item.toUpperCase();
    const textData = action.query.toUpperCase();

    return itemData.indexOf(textData) > -1;
  });

  yield put({ type: SEARCH_COUNTRY_RESULT, countries: newData });
}

function* fetchPopulation(action) {
  try {
    console.log("TODO: update country list", action);
    const path = `/${(new Date()).getFullYear()}/${action.country}`;
    const response = yield call(ApiRequest.request, "/population", path, { action: "GET" });

    if (response) {
      yield put({ type: FETCH_POPULATION_RESULT, population: response });
    } else {
      yield put({ type: FETCH_POPULATION_ERROR, error: "something went wrong" });
    }
  } catch (e) {
    console.log("Saga error", e.message);
    yield put({ type: FETCH_POPULATION_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_COUNTRIES_LIST, fetchCountriesList);
  yield takeEvery(SEARCH_COUNTRY, searchQuery);
  yield takeEvery(FETCH_POPULATION, fetchPopulation);
}
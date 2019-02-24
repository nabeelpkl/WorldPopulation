import { combineReducers } from 'redux';
import countries from './countries';
import population from './population';

export default combineReducers({
  countries,
  population,
});
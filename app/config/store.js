import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger); // should be the last middleware inorder to listen to all changes
}

const store = createStore(reducers, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;

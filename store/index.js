import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
// import { apiMiddleware } from 'redux-api-middleware';
import loggingMiddleware from 'redux-logger'

// const createStoreWithMiddleware = applyMiddleware(apiMiddleware, thunkMiddleware)(createStore);

// const store = createStoreWithMiddleware(reducer)

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;

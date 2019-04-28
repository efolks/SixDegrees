import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;
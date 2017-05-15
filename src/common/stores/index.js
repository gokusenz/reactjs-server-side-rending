import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const promise = (store) => {
  const next = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') { return action.then(next); }
    return next(action);
  };
};

export default (history, preloadState = {}) => {
  const middlewares = [thunk, apiMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer,
    preloadState,
    compose(applyMiddleware(...middlewares)),
  );

  store.dispatch = promise(store);

  return store;
};

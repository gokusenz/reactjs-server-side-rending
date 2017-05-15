import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ListReducer from './List';

const rootReducer = combineReducers({
  routing: routerReducer,
  list: ListReducer,
});

export default rootReducer;

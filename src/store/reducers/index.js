import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  global: globalReducer,
  auth: authReducer,
});

export default reducers;

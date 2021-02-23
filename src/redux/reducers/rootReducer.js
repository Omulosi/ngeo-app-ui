import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import authReducer from './authReducer';
import agentReducer from './agentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  agent: agentReducer
});

export default rootReducer;

import { combineReducers } from 'redux';

// REDUCERS
import users from './users';

const root = combineReducers({
  users
});

export default root;
import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer, // Reducer for handling the loading bar state provided by react-redux-loading-bar
});

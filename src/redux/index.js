import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import questionsReducer from './questionsSlice';
import authedUserReducer from './authedUserSlice';
import { loadingBarReducer } from 'react-redux-loading-bar';

const RESET_STATE = 'RESET_STATE';

const appReducer = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  authedUser: authedUserReducer,
  loadingBar: loadingBarReducer,
});

export const resetState = () => ({
  type: RESET_STATE,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

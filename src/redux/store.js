import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

//Custom logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The action:', action);
  const returnValue = next(action);
  console.log('The new state:', store.getState());
  console.groupEnd();
  return returnValue;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loadingBarMiddleware())
      .concat(loggerMiddleware),
});

export default store;

import { getInitialData } from './api';
import { receiveUsers } from '../redux/usersSlice';
import { receiveQuestions } from '../redux/questionsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setAuthedUser } from '../redux/authedUserSlice';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function fetchInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { users, questions } = await getInitialData();
      const AUTHED_ID = JSON.parse(localStorage.getItem('userId'));
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
}

export function useInitialDataLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);
}

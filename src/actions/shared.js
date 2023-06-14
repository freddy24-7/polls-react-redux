import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';
import { toggleQuestion } from './toggleQuestion';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { users, questions, questionId } = await getInitialData();

      const AUTHED_ID = JSON.parse(localStorage.getItem('userId'));
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(toggleQuestion(questionId));
      dispatch(hideLoading());
    } catch (error) {
      console.log('Error fetching initial data:', error);
      dispatch(hideLoading());
    }
  };
}

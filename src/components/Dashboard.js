import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Dashboard.css';
import { handleInitialData } from '../actions/shared';
import QuestionList from './QuestionList';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const user = users[userId];
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => !answeredQuestionIds.includes(id),
  );

  useEffect(() => {
    // Fetch and dispatch initial data
    dispatch(handleInitialData());
  }, [dispatch]);

  // Render nothing if the required data is not available yet
  if (!userId || !questions || !answeredQuestionIds || !unansweredQuestionIds) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h5 className="h5">Welcome {user ? user.name : ''}</h5>
      {answeredQuestionIds.length > 0 && (
        <h2 className="h2">Questions already done</h2>
      )}
      <QuestionList
        questionIds={answeredQuestionIds}
        answeredQuestionIds={answeredQuestionIds}
      />
      {unansweredQuestionIds.length > 0 && (
        <h2 className="center">New Questions</h2>
      )}
      <QuestionList
        questionIds={unansweredQuestionIds}
        answeredQuestionIds={answeredQuestionIds}
      />
    </div>
  );
};

export default Dashboard;

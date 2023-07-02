import React from 'react';
import { useSelector } from 'react-redux';
import useInitialDataLoader from '../utils/initialDataLoader';
import './Dashboard.css';
import QuestionList from './QuestionList';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = users[userId];

  // Custom hook to load initial data
  useInitialDataLoader();

  // Compute answered and unanswered question IDs
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => id !== 'newQuestion' && !answeredQuestionIds.includes(id),
  );

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

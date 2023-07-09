import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useInitialDataLoader from '../utils/initialDataLoader';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './Dashboard.css';
import QuestionList from './QuestionList';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = users[userId];
  const [showAnswered, setShowAnswered] = useState(true); // State to toggle between answered and unanswered questions

  // Custom hook to load initial data
  useInitialDataLoader();

  // Computing answered and unanswered question IDs
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => id !== 'newQuestion' && !answeredQuestionIds.includes(id),
  );

  return (
    <div className="dashboard-container">
      <h5 className="h5">Welcome {user ? user.name : ''}</h5>
      <div className="toggle-container">
        <label>
          <Toggle
            checked={showAnswered}
            onChange={() => setShowAnswered(!showAnswered)}
          />
          <span>
            <p className="text">Show Responded To / Show New Questions</p>
          </span>
        </label>
      </div>
      {showAnswered && answeredQuestionIds.length > 0 && (
        <h2 className="h2">Questions Responded To</h2>
      )}
      {showAnswered && (
        <QuestionList
          questionIds={answeredQuestionIds}
          answeredQuestionIds={answeredQuestionIds}
        />
      )}
      {!showAnswered && unansweredQuestionIds.length > 0 && (
        <h2 className="center">New Questions</h2>
      )}
      {!showAnswered && (
        <QuestionList
          questionIds={unansweredQuestionIds}
          answeredQuestionIds={answeredQuestionIds}
        />
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
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
  const [showAnswered, setShowAnswered] = useState(false);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState([]);

  // Custom hook to load initial data
  useInitialDataLoader();

  useEffect(() => {
    const answeredIds = user ? Object.keys(user.answers) : [];
    const unansweredIds = Object.keys(questions).filter(
      (id) => id !== 'newQuestion' && !answeredIds.includes(id),
    );

    setAnsweredQuestionIds(answeredIds);
    setUnansweredQuestionIds(unansweredIds);
  }, [user, questions]);

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

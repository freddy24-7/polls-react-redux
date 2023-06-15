import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import { handleInitialData } from '../actions/shared';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const [expandedQuestions] = useState([]);
  const dispatch = useDispatch();

  const user = users[userId];
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => !answeredQuestionIds.includes(id),
  );

  const renderQuestionList = (questionIds) => {
    const filteredQuestionIds = questionIds
      .filter((id) => questions[id] && questions[id].author)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return (
      <div className="question-list">
        {filteredQuestionIds.map((id) => (
          <div
            key={id}
            className={`question-card ${
              expandedQuestions.includes(id) ? 'expanded' : ''
            }`}
          >
            <div className="card-header">
              <span>{questions[id].author}</span>
            </div>
            <div className="center">
              <span>{formatDate(questions[id].timestamp)}</span>
            </div>
            {answeredQuestionIds.includes(id) ? (
              <div className="card-body"></div>
            ) : (
              <div className="card-body">
                <p className="question-text">Would you rather?</p>
                <ul className="options-list">
                  <li>{questions[id].optionOne.text}</li>
                  <li>{questions[id].optionTwo.text}</li>
                </ul>
              </div>
            )}
            <div className="center">
              <Link to={`/questions/${id}`}>
                {answeredQuestionIds.includes(id) ? (
                  <Button>Show</Button>
                ) : (
                  <Button>Vote</Button>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const filteredUnansweredQuestionIds = unansweredQuestionIds
    .filter((id) => questions[id] !== undefined)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  useEffect(() => {
    // Fetch and dispatch initial data
    dispatch(handleInitialData());
  }, [dispatch]);

  if (!userId || !questions || !answeredQuestionIds || !unansweredQuestionIds) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h5 className="h5">Welcome {user ? user.name : ''}</h5>
      <h2 className="h2">Questions already done</h2>
      {renderQuestionList(answeredQuestionIds)}
      <h2 className="center">New Questions</h2>
      {renderQuestionList(filteredUnansweredQuestionIds)}
    </div>
  );
};

export default Dashboard;

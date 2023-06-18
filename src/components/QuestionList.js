import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './QuestionList.css';
import { formatDate } from '../utils/helpers';
import Button from './Button';

const QuestionList = ({ questionIds, answeredQuestionIds }) => {
  const questions = useSelector((state) => state.questions);

  // Filter and sort the questionIds based on availability and timestamp
  const filteredQuestionIds = questionIds
    .filter((id) => questions[id] && questions[id].author)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  console.log('Updated question data:', filteredQuestionIds);

  // Check if there are questions available
  if (filteredQuestionIds.length === 0) {
    return null;
  }

  return (
    <div className="question-list">
      {filteredQuestionIds.map((id) => (
        <div key={id} className="question-card">
          <div className="card-header">
            <span>{questions[id].author}</span>
          </div>
          <div className="center">
            <span>{formatDate(questions[id].timestamp)}</span>
          </div>
          {answeredQuestionIds.includes(id) ? (
            // Displayed when the question is already answered by the user
            <div className="card-body"></div>
          ) : (
            // Displayed when the question is unanswered by the user
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
                // Show button when the question is already answered
                <Button>Show</Button>
              ) : (
                // Vote button when the question is unanswered
                <Button>Vote</Button>
              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './QuestionList.css';
import { formatDate } from '../utils/helpers';
import Button from './Button';

const QuestionList = ({ questionIds, answeredQuestionIds }) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  // Filter and sort the questionIds based on availability and timestamp
  const filteredQuestionIds = questionIds
    .filter((id) => questions[id] && questions[id].author)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // Check if there are questions available
  if (filteredQuestionIds.length === 0) {
    return null;
  }

  return (
    <div className="question-list">
      {filteredQuestionIds.map((id) => {
        const question = questions[id];
        const author = users[question.author];

        return (
          <div key={id} className="question-card">
            <div className="card-header">
              <span>{author.name}</span>
            </div>
            <div className="center">
              <span>{formatDate(question.timestamp)}</span>
            </div>
            {answeredQuestionIds.includes(id) ? (
              // Displayed when the question is already answered by the user
              <div className="card-body"></div>
            ) : (
              // Displayed when the question is unanswered by the user
              <div className="card-body">
                <p className="question-text">Would you rather?</p>
                <ul className="options-list">
                  <li>{question.optionOne.text}</li>
                  <li>{question.optionTwo.text}</li>
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
        );
      })}
    </div>
  );
};

export default QuestionList;

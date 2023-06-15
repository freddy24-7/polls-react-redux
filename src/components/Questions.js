import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatPercentage } from '../utils/helpers';
import './Questions.css';
import { handleInitialData } from '../actions/shared';

const Questions = () => {
  const { question_id } = useParams();

  // Get question, users, and authedUser from the Redux store
  const question = useSelector((state) => state.questions[question_id]);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch and dispatch initial data on component mount
    dispatch(handleInitialData());
  }, [dispatch]);

  // If question, users, or authedUser is not available, return null
  if (!question || !users || !authedUser) {
    return null;
  }

  // Get author details from users
  const author = users[question.author];

  // Calculate total votes and percentages for each option
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;

  // Check if the authedUser has responded to the question
  const userHasResponded =
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser);

  return (
    <div className="question-container">
      <div className="page-container">
        <h3 className="question-heading">Would You Rather?</h3>
        <div className="question-details">
          <div className="author-avatar">
            <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />
          </div>
          <div className="options-container">
            {userHasResponded ? (
              // Render options with votes and percentages if user has responded
              <>
                <div
                  className={`option ${
                    question.optionOne.votes.includes(authedUser)
                      ? 'selected'
                      : ''
                  }`}
                >
                  <p>{question.optionOne.text}</p>
                  <p>
                    Votes: {optionOneVotes} (
                    {formatPercentage(optionOnePercentage)})
                  </p>
                </div>
                <div
                  className={`option ${
                    question.optionTwo.votes.includes(authedUser)
                      ? 'selected'
                      : ''
                  }`}
                >
                  <p>{question.optionTwo.text}</p>
                  <p>
                    Votes: {optionTwoVotes} (
                    {formatPercentage(optionTwoPercentage)})
                  </p>
                </div>
              </>
            ) : (
              // Render options without votes and percentages if user has not responded
              <>
                <div className="option">
                  <p>{question.optionOne.text}</p>
                </div>
                <div className="option">
                  <p>{question.optionTwo.text}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;

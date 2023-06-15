import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatPercentage } from '../utils/helpers';
import './Questions.css';
import { handleInitialData } from '../actions/shared';
import Vote from './Vote';

const Questions = () => {
  const { question_id } = useParams();
  const question = useSelector((state) => state.questions[question_id]);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial data
    dispatch(handleInitialData());
  }, [dispatch]);

  if (!question || !users || !authedUser) {
    // Render nothing if data is not available yet
    return null;
  }

  const author = users[question.author];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;

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
              // User has responded to the question
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
              // User has not responded to the question
              <>
                <Vote
                  optionText={question.optionOne.text}
                  questionId={question_id}
                />
                <Vote
                  optionText={question.optionTwo.text}
                  questionId={question_id}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;

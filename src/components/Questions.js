import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatPercentage } from '../utils/helpers';
import './Questions.css';
import { handleInitialData } from '../actions/shared';
import Vote from './Vote';
import Modal from './Modal';
import { handleSaveQuestionAnswer } from '../actions/questions';

const Questions = () => {
  const { question_id } = useParams();
  const question = useSelector((state) => state.questions[question_id]);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalDisplayNumber, setModalDisplayNumber] = useState(0);
  const [modalPercentage, setModalPercentage] = useState(0);

  const author = users[question.author];
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;

  useEffect(() => {
    // Fetch initial data
    dispatch(handleInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (!question || !users || !authedUser) {
      // Render nothing if data is not available yet
      return null;
    }

    if (!question.optionOne || !question.optionTwo) {
      // Render an error message or appropriate UI when the question is not found
      return <div>Question not found.</div>;
    }

    if (selectedOption === question.optionOne.text) {
      setModalDisplayNumber(question.optionOne.votes.length + 1);
      setModalPercentage(
        ((question.optionOne.votes.length + 1) /
          (question.optionOne.votes.length +
            1 +
            question.optionTwo.votes.length)) *
          100,
      );
    } else if (selectedOption === question.optionTwo.text) {
      setModalDisplayNumber(question.optionTwo.votes.length + 1);
      setModalPercentage(
        ((question.optionTwo.votes.length + 1) /
          (question.optionTwo.votes.length +
            1 +
            question.optionOne.votes.length)) *
          100,
      );
    }
  }, [selectedOption, question, authedUser, users]);

  const userHasResponded =
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser);

  const handleVote = (optionText) => {
    dispatch(handleSaveQuestionAnswer(question_id, optionText));
    setSelectedOption(optionText);
    setShowModal(true);
  };

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
                  onVote={handleVote}
                />
                <Vote
                  optionText={question.optionTwo.text}
                  questionId={question_id}
                  onVote={handleVote}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          message={`Your vote is recorded! You have voted for "${selectedOption}".
          There are ${modalDisplayNumber} vote(s) for this option, including your vote.
          ${formatPercentage(
            modalPercentage,
          )} of the respondents have opted for this response.`}
        />
      )}
    </div>
  );
};

export default Questions;

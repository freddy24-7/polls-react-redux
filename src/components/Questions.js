import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatPercentage } from '../utils/helpers';
import './Questions.css';
import Vote from './Vote';
import Modal from './Modal';
import { saveQuestionAnswer } from '../redux/questionsSlice';

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

  const author = question && question.author ? users[question.author] : null;
  const totalVotes =
    question && question.optionOne && question.optionTwo
      ? question.optionOne.votes.length + question.optionTwo.votes.length
      : 0;

  const optionOneVotes =
    question && question.optionOne && question.optionOne.votes
      ? question.optionOne.votes.length
      : 0;

  const optionTwoVotes =
    question && question.optionTwo && question.optionTwo.votes
      ? question.optionTwo.votes.length
      : 0;

  const optionOnePercentage =
    totalVotes !== 0 ? (optionOneVotes / totalVotes) * 100 : 0;
  const optionTwoPercentage =
    totalVotes !== 0 ? (optionTwoVotes / totalVotes) * 100 : 0;

  //Data manipulation for the modal
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

  //Handling the vote
  const handleVote = (optionText) => {
    dispatch(
      saveQuestionAnswer({
        authedUser,
        questionId: question_id,
        optionText,
      }),
    );
    setSelectedOption(optionText);
    setShowModal(true);

    // Saving the user's response to localStorage with the question ID as part of the key
    localStorage.setItem(`hasResponded_${question_id}`, true.toString());

    // Storing the selected option in local storage
    localStorage.setItem(`selectedOption_${question_id}`, optionText);
  };

  //Cleaning up on unmount, to align with the (lack of) persistence of the data in the store
  window.addEventListener('beforeunload', () => {
    // Remove the values from localStorage when the page is about to be unloaded
    localStorage.removeItem(`hasResponded_${question_id}`);
    localStorage.removeItem(`selectedOption_${question_id}`);
  });

  //Checking if the user has responded to the question
  const userHasResponded =
    question &&
    question.optionOne &&
    question.optionTwo &&
    (question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser) ||
      localStorage.getItem(`hasResponded_${question_id}`) === 'true');

  return (
    <div className="question-container">
      {question && users && authedUser ? (
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
                  {question.optionOne && (
                    <div
                      className={`option ${
                        question.optionOne.votes.includes(authedUser) ||
                        localStorage.getItem(
                          `selectedOption_${question_id}`,
                        ) === question.optionOne.text
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
                  )}
                  {question.optionTwo && (
                    <div
                      className={`option ${
                        question.optionTwo.votes.includes(authedUser) ||
                        localStorage.getItem(
                          `selectedOption_${question_id}`,
                        ) === question.optionTwo.text
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
                  )}
                </>
              ) : (
                // User has not responded to the question
                <>
                  {question.optionOne && (
                    <Vote
                      optionText={question.optionOne.text}
                      questionId={question_id}
                      onVote={handleVote}
                    />
                  )}
                  {question.optionTwo && (
                    <Vote
                      optionText={question.optionTwo.text}
                      questionId={question_id}
                      onVote={handleVote}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
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

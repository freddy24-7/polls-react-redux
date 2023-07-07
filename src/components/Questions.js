import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { formatPercentage } from '../utils/helpers';
import './Questions.css';
import Vote from './Vote';
import Modal from './Modal';
import { saveQuestionAnswer } from '../redux/questionsSlice';
import { users2, questions } from '../utils/_DATA';
import avatarSara from '../assets/adventurer-1686220697855.jpg';
import avatarTyler from '../assets/adventurer-1686220535457.png';
import avatarMike from '../assets/adventurer-1686220777175.jpg';
import avatarZenobia from '../assets/adventurer-1686220702223.jpg';

const Questions = () => {
  const navigate = useNavigate();
  const { question_id } = useParams();
  const question = useSelector((state) => state.questions[question_id]);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalDisplayNumber, setModalDisplayNumber] = useState(0);
  const [modalPercentage, setModalPercentage] = useState(0);
  const [selectedUser, setSelectedUser] = useState('');

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
      return () => {};
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

  console.log(authedUser);

  //Handling the vote
  const handleVote = (optionText) => {
    if (!authedUser) {
      navigate('/404');
      return;
    }
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

  // Checking if the user has responded to the question
  const userHasResponded =
    (question &&
      question.optionOne &&
      question.optionTwo &&
      (question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser) ||
        localStorage.getItem(`hasResponded_${question_id}`) === 'true')) ||
    false;

  useEffect(() => {
    // Retrieve the userId from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      setSelectedUser(userId);
    }
  }, []);

  console.log('authedUser', authedUser);
  console.log(question_id);
  console.log(selectedUser);

  const avatars = {
    sarahedo: avatarSara,
    tylermcginnis: avatarTyler,
    mtsamis: avatarMike,
    zoshikanlu: avatarZenobia,
  };

  const getQuestionDetails = (question_id) => {
    const question = questions[question_id];
    if (question) {
      const author = users[question.author];
      const avatarURL = avatars[author && author.id];
      const optionOne = question.optionOne;
      const optionTwo = question.optionTwo;

      return {
        avatarURL,
        optionOne,
        optionTwo,
      };
    } else {
      return null; // Question not found
    }
  };

  const questionDetails = getQuestionDetails(question_id);
  if (questionDetails) {
    const { optionOne, optionTwo } = questionDetails;
    console.log('Option One:', optionOne);
    console.log('Option Two:', optionTwo);
    const authorId = questions[question_id].author;
    const avatarURL = users2[authorId].avatarURL;
    console.log('Avatar URL:', avatarURL);
    console.log('Avatar URL from avatars object:', avatars[authorId]);
    console.log(authorId);

    // Store values in local storage
    localStorage.setItem('avatarURL', avatarURL);
    localStorage.setItem('optionOne', JSON.stringify(optionOne));
    localStorage.setItem('optionTwo', JSON.stringify(optionTwo));
  } else {
    console.log('Question not found');
  }

  // Retrieve values from local storage
  const storedAvatarURL = localStorage.getItem('avatarURL');
  const storedOptionOne = JSON.parse(localStorage.getItem('optionOne'));
  const storedOptionTwo = JSON.parse(localStorage.getItem('optionTwo'));

  console.log('Stored Avatar URL:', storedAvatarURL);
  console.log(storedOptionOne);
  console.log(storedOptionTwo);
  console.log(storedOptionOne.text);
  console.log(storedOptionTwo.text);
  console.log(userHasResponded);

  return (
    <div className="question-container">
      {question_id && (authedUser || selectedUser) ? (
        <div className="page-container">
          <h3 className="question-heading">Would You Rather?</h3>
          <div className="question-details">
            <div className="author-avatar">
              <img
                src={(author && author.avatarURL) || storedAvatarURL}
                alt={`Avatar of ${author && author.name}`}
              />
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
                  <Vote
                    optionText={
                      question && question.optionOne.text
                        ? question.optionOne.text
                        : storedOptionOne && storedOptionOne.text
                    }
                    questionId={question_id}
                    onVote={handleVote}
                  />
                  <Vote
                    optionText={
                      question && question.optionTwo.text
                        ? question.optionTwo.text
                        : storedOptionTwo && storedOptionTwo.text
                    }
                    questionId={question_id}
                    onVote={handleVote}
                  />
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

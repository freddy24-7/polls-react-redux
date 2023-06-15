import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import { handleSaveQuestionAnswer } from '../actions/questions';

const Vote = ({ optionText, questionId }) => {
  const dispatch = useDispatch();

  const handleVote = () => {
    // Dispatch the action to save the question answer
    dispatch(handleSaveQuestionAnswer(questionId, optionText));
  };

  return (
    <div className="vote-option">
      <p>{optionText}</p>
      <Link to="/home">
        <Button onClick={handleVote}>Vote</Button>
      </Link>
    </div>
  );
};

export default Vote;

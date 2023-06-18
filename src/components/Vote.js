import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Vote = ({ optionText, onVote }) => {
  const navigate = useNavigate();

  const handleVote = () => {
    // Call the onVote function with the selected option
    onVote(optionText);

    // Set a timeout to transition to the home route after 7 seconds
    setTimeout(() => {
      navigate('/home');
    }, 3500);
  };

  return (
    <div className="vote-option">
      <p>{optionText}</p>
      <Button data-testid="vote-button" onClick={handleVote}>
        Vote
      </Button>
    </div>
  );
};

export default Vote;

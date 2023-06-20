import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSaveQuestion } from '../actions/questions';
import Button from './Button';
import './NewQuestion.css';

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOptionOneChange = (e) => {
    setOptionOneText(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the action to save the new question
    dispatch(handleSaveQuestion(optionOneText, optionTwoText));

    // Reset the form fields
    setOptionOneText('');
    setOptionTwoText('');

    // Navigate back to the home page
    navigate('/home');
  };

  return (
    <Fragment>
      <div className="new-question-container">
        <h2 className="new-question-title">Create a new question here!</h2>
        <div className="custom-card">
          <h4 className="new-question-heading">Would you rather?</h4>
          <form className="new-question-form" onSubmit={handleSubmit}>
            <label htmlFor="optionOne" className="new-question-label">
              Option One:
            </label>
            <input
              type="text"
              id="optionOne"
              value={optionOneText}
              onChange={handleOptionOneChange}
              required
            />
            <label htmlFor="optionTwo" className="new-question-label">
              Option Two:
            </label>
            <input
              type="text"
              id="optionTwo"
              value={optionTwoText}
              onChange={handleOptionTwoChange}
              required
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewQuestion;
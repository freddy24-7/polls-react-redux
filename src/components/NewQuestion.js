import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion } from '../redux/questionsSlice';
import Button from './Button';
import './NewQuestion.css';
import { users } from '../utils/_DATA';

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOptionOneChange = (e) => {
    setOptionOneText(e.target.value);
  };
  const handleOptionTwoChange = (e) => {
    setOptionTwoText(e.target.value);
  };

  //Dispatching the saveQuestion action creator
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveQuestion({
        questionId: Object.keys(users[authedUser].questions).pop(),
        optionOneText: optionOneText,
        optionTwoText: optionTwoText,
        author: authedUser,
      }),
    );

    //Resetting the form fields
    setOptionOneText('');
    setOptionTwoText('');

    //Navigating back to the home page
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

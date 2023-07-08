import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion } from '../redux/questionsSlice';
import Button from './Button';
import './NewQuestion.css';
import { users } from '../utils/_DATA';
import { resetState } from '../redux';
import Modal from './Modal';

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOptionOneChange = (e) => {
    setOptionOneText(e.target.value);
  };

  const handleOptionTwoChange = (e) => {
    setOptionTwoText(e.target.value);
  };

  //Adding a timeout for modal display
  useEffect(() => {
    let timeout;

    if (showModal) {
      // If showModal is true, set the timeout for 2 seconds
      timeout = setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validating question length
    if (optionOneText.length > 50 || optionTwoText.length > 50) {
      setModalMessage('Question length should be maximum 50 characters.');
      setShowModal(true);
      return;
    }

    //Validating alternatives
    if (optionOneText === optionTwoText) {
      setModalMessage('The two alternatives cannot be equal.');
      setShowModal(true);
      return;
    }

    dispatch(
      saveQuestion({
        questionId: Object.keys(users[authedUser].questions).pop(),
        optionOneText: optionOneText,
        optionTwoText: optionTwoText,
        author: authedUser,
      }),
    );

    setOptionOneText('');
    setOptionTwoText('');

    navigate('/home');
    dispatch(resetState());
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
      {showModal && <Modal message={modalMessage} />}
    </Fragment>
  );
};

export default NewQuestion;

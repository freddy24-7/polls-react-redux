import { createSlice } from '@reduxjs/toolkit';
import * as api from '../utils/api';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {},
  reducers: {
    receiveQuestions: (state, action) => {
      //Updating state with the received questions
      return { ...state, ...action.payload };
    },
    saveQuestionAnswer: (state, action) => {
      const { questionId, optionText, authedUser } = action.payload;

      //Calling the API to save the question answer
      api.saveQuestionAnswer({
        authedUser,
        qid: questionId,
        answer: optionText,
      });

      if (state[questionId] && state[questionId][optionText]) {
        //If the question and option exist in the state, updating the votes
        const updatedQuestion = {
          ...state[questionId],
          [optionText]: {
            ...state[questionId][optionText],
            votes: state[questionId][optionText].votes.concat(authedUser),
          },
        };

        //Updating the user's answers property with the new question ID
        const updatedUser = {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [questionId]: optionText,
          },
        };

        return {
          ...state,
          [questionId]: updatedQuestion,
          [authedUser]: updatedUser,
        };
      }

      //Returning the current state if the question or option doesn't exist
      return state;
    },
    saveQuestion: (state, action) => {
      const { questionId, optionOneText, optionTwoText, author } =
        action.payload;

      //Calling the API to save the new question
      api.saveQuestion({
        optionOneText,
        optionTwoText,
        author,
      });

      const newQuestion = {
        id: questionId,
        author,
        timestamp: Date.now(),
        optionOne: {
          votes: [],
          text: optionOneText,
        },
        optionTwo: {
          votes: [],
          text: optionTwoText,
        },
      };

      //Adding the new question to the state
      return {
        ...state,
        [questionId]: newQuestion,
      };
    },
  },
});

export const { receiveQuestions, saveQuestion } = questionsSlice.actions;

export const saveQuestionAnswer = (payload) => (dispatch) => {
  const { questionId, optionText, authedUser } = payload;

  //Calling the API to save the question answer
  api
    .saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer: optionText,
    })
    .then(() => {
      //Dispatching the action to update the question answer in the state
      dispatch({
        type: 'questions/saveQuestionAnswer',
        payload: { questionId, optionText, authedUser },
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export default questionsSlice.reducer;

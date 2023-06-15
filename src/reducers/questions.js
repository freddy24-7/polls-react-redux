import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_QUESTION_ANSWER:
      const { questionId, optionText, authedUser } = action;

      if (state[questionId] && state[questionId][optionText]) {
        const updatedQuestion = {
          ...state[questionId],
          [optionText]: {
            ...state[questionId][optionText],
            votes: state[questionId][optionText].votes.concat(authedUser),
          },
        };

        return {
          ...state,
          [questionId]: updatedQuestion,
        };
      }

      return state;

    default:
      return state;
  }
}

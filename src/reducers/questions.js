import { RECEIVE_QUESTIONS } from '../actions/questions';
import { TOGGLE_QUESTION } from '../actions/toggleQuestion';

// Reducer for handling questions state
export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      // Update the state with received questions
      return {
        ...state,
        ...action.questions,
      };

    case TOGGLE_QUESTION:
      // Toggle the "expanded" property of the specified question
      const { questionId } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          expanded: !state[questionId]?.expanded,
        },
      };

    default:
      return state;
  }
}

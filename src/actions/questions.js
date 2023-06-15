// Define a constant variable to hold the action type string.
// Import the necessary API function
import { saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

// Define a function called receiveQuestions that takes in a parameter named "questions".
export function receiveQuestions(questions) {
  // Return an object that represents an action.
  return {
    // Set the type property of the action object to the RECEIVE_QUESTIONS constant.
    type: RECEIVE_QUESTIONS,
    // Set the questions property of the action object to the passed-in "questions" parameter.
    questions,
  };
}

// Define the action type constant
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

// Define the action creator
export function handleSaveQuestionAnswer(questionId, optionText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    const answer = {
      authedUser,
      qid: questionId,
      answer: optionText,
    };

    // Dispatch the action to save the answer
    return saveQuestionAnswer(answer).then(() => {
      dispatch({
        type: SAVE_QUESTION_ANSWER,
        questionId,
        optionText,
        authedUser,
      });
    });
  };
}

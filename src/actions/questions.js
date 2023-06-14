// Define a constant variable to hold the action type string.
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

// Define a constant variable to hold the action type string.
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION';

// Define a function called toggleQuestion that takes in a parameter named "questionId".
export function toggleQuestion(questionId) {
  // Return an object that represents an action.
  return {
    // Set the type property of the action object to the TOGGLE_QUESTION constant.
    type: TOGGLE_QUESTION,
    // Set the questionId property of the action object to the passed-in "questionId" parameter.
    questionId,
  };
}

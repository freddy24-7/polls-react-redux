// Define a constant variable to hold the action type string.
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

// Define a function called receiveTweets that takes in a parameter named "tweets".
export function receiveQuestions(questions) {
  // Return an object that represents an action.
  return {
    // Set the type property of the action object to the RECEIVE_TWEETS constant.
    type: RECEIVE_QUESTIONS,
    // Set the tweets property of the action object to the passed-in "tweets" parameter.
    questions,
  };
}

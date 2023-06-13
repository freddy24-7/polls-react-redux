// Define a constant variable to hold the action type string.
export const RECEIVE_USERS = 'RECEIVE_USERS';

// Define a function called receiveUsers that takes in a parameter named "users".
export function receiveUsers(users) {
  // Return an object that represents an action.
  return {
    // Set the type property of the action object to the RECEIVE_USERS constant.
    type: RECEIVE_USERS,
    // Set the users property of the action object to the passed-in "users" parameter.
    users,
  };
}

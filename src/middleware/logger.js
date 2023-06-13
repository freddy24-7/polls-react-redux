const logger = (store) => (next) => (action) => {
  // Middleware function that logs information about dispatched actions and state changes
  console.group(action.type); // Start a new console group for the action type
  console.log('The action: ', action); // Log the dispatched action
  const returnValue = next(action); // Call the next middleware or dispatch the action
  console.log('The new state: ', store.getState()); // Log the updated state
  console.groupEnd(); // End the console group
  return returnValue; // Return the value from the next middleware
};

export default logger;

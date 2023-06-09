// Define a constant variable to hold the action type string.
export const SET_AUTHED_USER = "SET_AUTHED_USER";

// Define a function called setAuthedUser that takes in a parameter named "id".
export function setAuthedUser(id) {
    // Return an object that represents an action.
    return {
        // Set the type property of the action object to the SET_AUTHED_USER constant.
        type: SET_AUTHED_USER,
        // Set the id property of the action object to the passed-in "id" parameter.
        id,
    };
}
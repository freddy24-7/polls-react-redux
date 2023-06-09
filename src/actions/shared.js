// Import the getInitialData function from the "../utils/api" module.
import { getInitialData } from "../utils/api";

// Import the receiveUsers, receiveQuestions, and setAuthedUser functions from their respective modules.
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

// Define a constant variable to hold the authenticated user ID.
let AUTHED_ID = JSON.parse(localStorage.getItem('userId'));

// Define a function called handleInitialData.
export function handleInitialData() {

    // Return a function that takes in a "dispatch" parameter (thunk middleware).
    return (dispatch) => {
        // Call the getInitialData function and wait for the promise to resolve.
        return getInitialData().then(({ users, questions }) => {
            // Dispatch the receiveUsers action with the "users" data.
            dispatch(receiveUsers(users));
            // Dispatch the receiveQuestions action with the "questions" data.
            dispatch(receiveQuestions(questions));
            // Dispatch the setAuthedUser action with the authenticated user ID.
            dispatch(setAuthedUser(AUTHED_ID));
        });
    };
}


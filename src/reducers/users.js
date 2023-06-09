import { RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            // When the action type is RECEIVE_USERS, update the state by merging
            // the existing state with the new users received from the action.
            return {
                ...state,           // Spread operator to copy existing state
                ...action.users,    // Spread operator to merge new users into state
            };
        default:
            // For any other action types, return the current state as is.
            return state;
    }
}
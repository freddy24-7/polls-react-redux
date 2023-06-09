import { SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            // When the action type is SET_AUTHED_USER, update the state with the
            // authenticated user's ID obtained from the action.
            return action.id;
        default:
            // For any other action types, return the current state as is.
            return state;
    }
}
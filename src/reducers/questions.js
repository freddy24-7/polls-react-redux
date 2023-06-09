import { RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            // When the action type is RECEIVE_QUESTIONS, update the state by merging
            // the existing state with the new questions received from the action.
            return {
                ...state,           // Spread operator to copy existing state
                ...action.questions,   // Spread operator to merge new questions into state
            };
        default:
            // For any other action types, return the current state as is.
            return state;
    }
}
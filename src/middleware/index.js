import thunk from "redux-thunk";            // Importing the redux-thunk middleware
import logger from "./logger";              // Importing a custom logger middleware
import { applyMiddleware } from "redux";    // Importing the applyMiddleware function from Redux

// Applying the middleware to be used in the Redux store
export default applyMiddleware(thunk, logger);
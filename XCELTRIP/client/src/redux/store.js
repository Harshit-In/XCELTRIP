import { applyMiddleware, compose, createStore } from "redux";
import authReducer from "./reducer/authReducer";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  authReducer,
  composeEnhancers(applyMiddleware(thunk))
);
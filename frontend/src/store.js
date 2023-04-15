import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
// import rootReducer from './reducers';
// import { applyMiddleware } from "redux";

const reducer = combineReducers({
  auth: authReducer
  // root: rootReducer,
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
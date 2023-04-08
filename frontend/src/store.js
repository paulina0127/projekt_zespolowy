import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { loginReducer } from "./reducers/loginReducer";
// import rootReducer from './reducers';
// import { applyMiddleware } from "redux";

const reducer = combineReducers({
  login: loginReducer
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
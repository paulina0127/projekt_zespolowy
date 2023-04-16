import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  auth: authReducer
});

const userTokensFromStorage = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens"))
  : null;

export const initialState = {
  auth: { userTokens: userTokensFromStorage }
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
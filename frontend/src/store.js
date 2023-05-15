import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import {
  offerListReducer,
  offerDetailsReducer,
  offerCreateReducer,
  offerDeleteReducer,
} from './reducers/offerReducer';
import { candidateReducer } from './reducers/candidateReducer';
import { categoryListReducer } from './reducers/categoryReducer';
import {
  companyListReducer,
  companyDetailsReducer,
} from './reducers/companyReducer';
import { skillListReducer } from './reducers/skillReducer';
import {
  userProfileDetailsReducer,
  userCreateProfileReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  auth: authReducer,

  userProfileDetails: userProfileDetailsReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,

  candidate: candidateReducer,

  offerList: offerListReducer,
  offerDetails: offerDetailsReducer,
  offerCreate: offerCreateReducer,
  offerDelete: offerDeleteReducer,

  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,

  categoryList: categoryListReducer,
  skillsList: skillListReducer,
});

const userTokensFromStorage = localStorage.getItem('userTokens')
  ? JSON.parse(localStorage.getItem('userTokens'))
  : null;

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const initialState = {
  auth: {
    userTokens: userTokensFromStorage,
    user: userFromStorage,
  },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;

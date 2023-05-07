import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/authReducer'
import { 
  offerListReducer, 
  offerDetailsReducer, 
  offerCreateReducer, 
  offerDeleteReducer } 
from './reducers/offerReducer'
import { categoryListReducer } from './reducers/categoryReducer'
import { userProfileDetailsReducer, userCreateProfileReducer, userUpdateProfileReducer } from './reducers/userReducer'

const reducer = combineReducers({
  auth: authReducer,
  
  userProfileDetails: userProfileDetailsReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,

  offerList: offerListReducer,
  offerDetails: offerDetailsReducer,
  offerCreate: offerCreateReducer,
  offerDelete: offerDeleteReducer,

  categoryList: categoryListReducer,
})

const userTokensFromStorage = localStorage.getItem('userTokens')
  ? JSON.parse(localStorage.getItem('userTokens'))
  : null

export const initialState = {
  auth: { userTokens: userTokensFromStorage }
}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
})

export default store
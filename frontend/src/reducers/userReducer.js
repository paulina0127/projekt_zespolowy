import {
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,
  USER_DETAILS_PROFILE_RESET,

  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,

  USER_DELETE_PROFILE_REQUEST,
  USER_DELETE_PROFILE_SUCCESS,
  USER_DELETE_PROFILE_FAIL,

  USER_EDUCATION_REQUEST,
  USER_EDUCATION_SUCCESS,
  USER_EDUCATION_FAIL,

  USER_EXPERIENCE_REQUEST,
  USER_EXPERIENCE_SUCCESS,
  USER_EXPERIENCE_FAIL,

  USER_SKILL_REQUEST,
  USER_SKILL_SUCCESS,
  USER_SKILL_FAIL,

  USER_COURSE_REQUEST,
  USER_COURSE_SUCCESS,
  USER_COURSE_FAIL,

  USER_LINK_REQUEST,
  USER_LINK_SUCCESS,
  USER_LINK_FAIL,

  USER_FILES_SUCCESS,
  USER_FILES_FAIL,
} from '../constants/userConst'

export const userProfileDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COURSE_REQUEST:
    case USER_DETAILS_PROFILE_REQUEST:
    case USER_EDUCATION_REQUEST:
    case USER_EXPERIENCE_REQUEST:
    case USER_LINK_REQUEST:
    case USER_SKILL_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_PROFILE_SUCCESS:
      return {loading: false, user: action.payload }
    case USER_COURSE_SUCCESS:
      return {loading: false, courseList: action.payload }
    case USER_EXPERIENCE_SUCCESS:
      return {loading: false, experienceList: action.payload }
    case USER_EDUCATION_SUCCESS:
      return {loading: false, educationList: action.payload }
    case USER_LINK_SUCCESS:
      return {loading: false, linkList: action.payload }
    case USER_SKILL_SUCCESS:
      return {loading: false, skillList: action.payload }
    case USER_FILES_SUCCESS:
      return {...state, loading: false, filesList: action.payload }
    case USER_DETAILS_PROFILE_FAIL:
    case USER_COURSE_FAIL:
    case USER_EDUCATION_FAIL:
    case USER_EXPERIENCE_FAIL:
    case USER_LINK_FAIL:
    case USER_SKILL_FAIL:
    case USER_FILES_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_PROFILE_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userCreateProfileReducer = (state = {}, action) => {
  switch (action.type) { 
    case USER_CREATE_PROFILE_REQUEST:
      return { loadingCreate: true }
    case USER_CREATE_PROFILE_SUCCESS:
      return { loadingCreate: false, successCreate: true }
    case USER_CREATE_PROFILE_FAIL:
      return { loadingCreate: false, errorCreate: action.payload }
    case USER_CREATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) { 
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
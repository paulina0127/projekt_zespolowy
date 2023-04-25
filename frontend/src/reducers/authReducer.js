import { 
  ACTIVATION_REQUEST,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL
} from "../constants/authConst";


export const authReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch(type) {
    case AUTHENTICATED_SUCCESS:
      return {
          ...state,
          isAuthenticated: true
    }

    case ACTIVATION_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case PASSWORD_RESET_REQUEST:
    case PASSWORD_RESET_CONFIRM_REQUEST:
      return {loading:true }

    case LOGIN_SUCCESS:
      return {loading:false, userTokens: payload, isAuthenticated: true}

    case SIGNUP_SUCCESS:
      return {loading:false, success:true, userTokens: action.payload}

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      }

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      }

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {loading:false, success:false, error: action.payload}

    case LOGOUT:
      return {}

    case ACTIVATION_SUCCESS:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }

    case ACTIVATION_FAIL:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        loading:false,
        success: false,
        error: action.payload
      }

    default:
      return state
  }
}


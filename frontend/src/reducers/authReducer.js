import { 
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL
} from "../constants/authConst";

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case AUTHENTICATED_SUCCESS:
        return {
          ...state,
          isAuthenticated: true
        }
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      }
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}


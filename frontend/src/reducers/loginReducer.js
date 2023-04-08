import { 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT
} from "../constants/loginConst";

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: localStorage.getItem('auth'),
  user: null
};

export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case AUTHENTICATED_SUCCESS:
      localStorage.setItem('auth', true);
      return {
        ...state,
        isAuthenticated: true
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
      localStorage.setItem('auth', true);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      }
    case AUTHENTICATED_FAIL:
      localStorage.setItem('auth', false);
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
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('auth');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}


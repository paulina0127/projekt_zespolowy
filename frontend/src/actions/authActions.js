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

import axios from "axios";

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};

// nie działa poprawnie po odświeżeniu, tokeny są, autoryzacja nie przechodzi, na backendzie:
//     if BlacklistedToken.objects.filter(token__jti=jti).exists():
// AttributeError: type object 'BlacklistedToken' has no attribute 'objects'
// https://djoser.readthedocs.io/en/latest/jwt_endpoints.html
export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }; 

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
      if(response.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }

  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(load_user());

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const signup = (first_name, last_name, email, password, re_password, account_type) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ first_name, last_name, email, password, re_password, account_type });

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL
    })
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL
    })
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
    
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
  } catch(err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  }
};

// nie działa poprawnie - https://djoser.readthedocs.io/en/latest/base_endpoints.html#reset-password
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
    
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    });
  } catch(err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    });
  }
};



export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
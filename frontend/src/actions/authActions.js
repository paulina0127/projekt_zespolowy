import { 
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGIN_REQUEST, 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL
} from "../constants/authConst";

import axios from "axios";

export const load_user = () => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json'
      }
    };

    try {
      const { data } = await axios.get('/auth/users/me/', config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: data
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

  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }; 

    const body = JSON.stringify({ token: token });

    try {
      const { data } = await axios.post('/auth/jwt/verify/', body, config)
      if(data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
      });
    }

  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });

    const { data } = await axios.post('/auth/jwt/create/', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userTokens', JSON.stringify(data))

    dispatch(load_user());

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
    });
  }
};

export const signup = (type, email, password, re_password) => async dispatch => {
  try {
    dispatch({
      type: SIGNUP_REQUEST
    })

    const body = JSON.stringify({ type, email, password, re_password });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/auth/users/', body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
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
    await axios.post('/auth/users/activation/', body, config);

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
    await axios.post('/auth/users/reset_password/', body, config);
    
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
  } catch(err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  }
};


export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post('/auth/users/reset_password_confirm/', body, config);
    
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
  localStorage.removeItem('userTokens')
  dispatch({
    type: LOGOUT
  });
};
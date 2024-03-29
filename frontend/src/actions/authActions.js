import {
  ACTIVATION_FAIL,
  ACTIVATION_REQUEST,
  ACTIVATION_SUCCESS,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  EMAIL_CHANGE_REQUEST,
  EMAIL_CHANGE_SUCCESS,
  EMAIL_CHANGE_FAIL,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_REQUEST,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
} from '../constants/authConst';

import axios from 'axios';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;
  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };
};

export const load_user = () => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    const { data } = await axios.get('/auth/users/me/', config);

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: data,
    });

    localStorage.setItem('user', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const body = JSON.stringify({ token: token });

    try {
      const { data } = await axios.post('/auth/jwt/verify/', body, config);
      if (data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const body = JSON.stringify({ email, password });

    const { data } = await axios.post('/auth/jwt/create/', body, defaultConfig);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userTokens', JSON.stringify(data));

    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const signup =
  (type, email, password, re_password) => async (dispatch) => {
    try {
      dispatch({
        type: SIGNUP_REQUEST,
      });

      const body = JSON.stringify({ type, email, password, re_password });

      const { data } = await axios.post('/auth/users/', body, defaultConfig);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  try {
    dispatch({
      type: ACTIVATION_REQUEST,
    });

    const body = JSON.stringify({ uid, token });

    await axios.post('/auth/users/activation/', body, defaultConfig);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const change_password =
  (new_password, re_new_password, current_password) => async (dispatch) => {
    const config = { headers: getAuthHeaders() };
    try {
      dispatch({
        type: PASSWORD_CHANGE_REQUEST,
      });

      const body = JSON.stringify({
        new_password,
        re_new_password,
        current_password,
      });

      await axios.post('/auth/users/set_password/', body, config);

      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_CHANGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const change_email =
  (new_email, re_new_email, current_password) => async (dispatch) => {
    const config = { headers: getAuthHeaders() };
    try {
      dispatch({
        type: EMAIL_CHANGE_REQUEST,
      });

      const body = JSON.stringify({
        new_email,
        re_new_email,
        current_password,
      });

      await axios.post('/auth/users/set_email/', body, config);

      dispatch({
        type: EMAIL_CHANGE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: EMAIL_CHANGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const reset_password = (email) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });

    const body = JSON.stringify({ email });

    await axios.post('/auth/users/reset_password/', body, defaultConfig);

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    try {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_REQUEST,
      });

      const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password,
      });

      await axios.post(
        '/auth/users/reset_password_confirm/',
        body,
        defaultConfig
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const delete_account = (current_password) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({
      type: DELETE_ACCOUNT_REQUEST,
    });

    const body = JSON.stringify({ current_password });

    await axios.delete('/auth/users/me/', body, config);

    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
    });

    window.location.href = '/';
    localStorage.removeItem('userTokens');
    localStorage.removeItem('user');
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  window.location.href = '/';
  localStorage.removeItem('userTokens');
  localStorage.removeItem('user');
  dispatch({
    type: LOGOUT,
  });
};

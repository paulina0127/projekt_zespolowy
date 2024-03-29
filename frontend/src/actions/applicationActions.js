import {
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_FAIL,
  APPLICATION_REQUEST,
  APPLICATION_SUCCESS,
} from '../constants/applicationConst';
import axios from 'axios';

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;
  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };
};

export const listApplications = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: APPLICATION_LIST_REQUEST });

    // convert filters object to query string
    let query = '';
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (val !== '') {
            query += `&${key}=${val}`;
          }
        });
      } else if (value !== '') {
        query += `&${key}=${value}`;
      }
    });
    query = query.substring(1);

    const { data } = await axios.get(`/applications?${query}`, config);

    dispatch({
      type: APPLICATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: APPLICATION_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listApplicationDetails = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: APPLICATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/applications/${id}`, config);

    dispatch({
      type: APPLICATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: APPLICATION_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateApplication = (id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: APPLICATION_REQUEST });

    const body = JSON.stringify({
      status: values.status,
      mark: values.mark,
      notes: values.notes,
    });
    await axios.patch(`/applications/${id}`, body, config);

    dispatch({
      type: APPLICATION_SUCCESS,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: APPLICATION_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

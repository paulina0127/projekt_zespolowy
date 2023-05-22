import axios from 'axios';
import {
  OFFER_CREATE_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_UPDATE_FAIL,
  OFFER_UPDATE_REQUEST,
  OFFER_UPDATE_SUCCESS,
  OFFER_DELETE_FAIL,
  OFFER_DELETE_REQUEST,
  OFFER_DELETE_SUCCESS,
  OFFER_DETAILS_FAIL,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_FILTERED_LIST_FAIL,
  OFFER_FILTERED_LIST_REQUEST,
  OFFER_FILTERED_LIST_SUCCESS,
} from '../constants/offerConst';

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;

  if (!token) {
    return null;
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };
};

export const listFilteredOffers = (filters) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: OFFER_FILTERED_LIST_REQUEST });

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
    const { data } = await axios.get(`/offers?${query}`, config);

    dispatch({
      type: OFFER_FILTERED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: OFFER_FILTERED_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const listOfferDetails = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: OFFER_DETAILS_REQUEST });

    const { data } = await axios.get(`/offers/${id}`, config);

    dispatch({
      type: OFFER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: OFFER_DETAILS_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createOffer = (values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: OFFER_CREATE_REQUEST });

    const body = JSON.stringify({
      position: values.position,
      position_level: values.position_level,
      location: values.location,
      category: values.category,
      salary: values.salary,
      contract_type: values.contract_type,
      working_mode: values.working_mode,
      working_time: values.working_time,
      duties: values.duties.filter((duty) => duty !== ''), // usuwanie pustych wartości z tablicy obowiązków
      advantages: values.advantages.filter((advantage) => advantage !== ''), // usuwanie pustych wartości z tablicy zalet
      requirements: values.requirements,
      expiration_date: values.expiration_date,
    });

    const { data } = await axios.post('/offers', body, config);

    dispatch({
      type: OFFER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: OFFER_CREATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateOffer = (values, id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: OFFER_UPDATE_REQUEST });

    const body = JSON.stringify({
      position: values.position,
      position_level: values.position_level,
      location: values.location,
      category: values.category,
      salary: values.salary,
      contract_type: values.contract_type,
      working_mode: values.working_mode,
      working_time: values.working_time,
      duties: values.duties.filter((duty) => duty !== ''), // usuwanie pustych wartości z tablicy obowiązków
      advantages: values.advantages.filter((advantage) => advantage !== ''), // usuwanie pustych wartości z tablicy zalet
      requirements: values.requirements,
      expiration_date: values.expiration_date,
    });

    const { data } = await axios.put(`/offers/${id}`, body, config);

    dispatch({
      type: OFFER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: OFFER_UPDATE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const deleteOffer = (id) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: OFFER_DELETE_REQUEST });

    await axios.delete(`/offers/${id}`, config);

    dispatch({
      type: OFFER_DELETE_SUCCESS,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: OFFER_DELETE_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

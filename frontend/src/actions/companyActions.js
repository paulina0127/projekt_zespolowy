import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
} from '../constants/companyConst';
import axios from 'axios';

export const listCompanies = (filters) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_LIST_REQUEST });

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

    const { data } = await axios.get(`/companies?${query}`);

    dispatch({
      type: COMPANY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listCompanyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_DETAILS_REQUEST });

    const { data } = await axios.get(`/companies/${id}`);

    dispatch({
      type: COMPANY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

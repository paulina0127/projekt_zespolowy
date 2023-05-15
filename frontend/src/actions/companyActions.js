import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_CLEAR,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_CLEAR,
} from '../constants/companyConst';
import axios from 'axios';

export const listCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_LIST_REQUEST });

    const { data } = await axios.get('/companies');

    dispatch({
      type: COMPANY_LIST_SUCCESS,
      payload: data.results,
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

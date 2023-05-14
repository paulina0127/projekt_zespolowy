import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_CLEAR,
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

import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from '../constants/categoryConst';
import axios from 'axios';

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get('/categories?is_main=true');

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

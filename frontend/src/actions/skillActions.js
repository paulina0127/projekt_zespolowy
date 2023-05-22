import {
  SKILL_LIST_REQUEST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAIL,
} from '../constants/skillConst';
import axios from 'axios';

export const listSkills = () => async (dispatch) => {
  try {
    dispatch({ type: SKILL_LIST_REQUEST });

    const { data } = await axios.get('/skills');

    dispatch({
      type: SKILL_LIST_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: SKILL_LIST_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

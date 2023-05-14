import { 
  SKILL_LIST_REQUEST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAIL,
} from '../constants/skillConst'
import axios from 'axios'

export const listSkills = () => async dispatch => {
  try {
    dispatch({type: SKILL_LIST_REQUEST});

    const { data } = await axios.get('/skills');

    dispatch({
      type: SKILL_LIST_SUCCESS,
      payload: data.results
    });

  } catch (error) {
    dispatch({
      type:SKILL_LIST_FAIL,
      payload:error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message
    });
  }
}
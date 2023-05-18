import { 
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
} from '../constants/applicationConst'
import axios from 'axios'

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'))
  const token = userTokens ? userTokens.access : null
  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  }
}

export const listApplications = () => async dispatch => {
  const config = { headers: getAuthHeaders() }
  try {
    dispatch({type: APPLICATION_LIST_REQUEST})

    const { data } = await axios.get('/applications', config)

    dispatch({
      type: APPLICATION_LIST_SUCCESS,
      payload: data.results
    })

  } catch (error) {
    dispatch({
      type:APPLICATION_LIST_FAIL,
      payload:error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message
    })
  }
}
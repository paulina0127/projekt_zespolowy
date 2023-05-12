import { 
  CANDIDATE_COMPONENT_REQUEST,
  CANDIDATE_COMPONENT_SUCCESS,
  CANDIDATE_COMPONENT_FAIL,
} from '../constants/candidateConst'
import axios from "axios";

export const createExperience = (profile, values) => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    try {
      dispatch({type: CANDIDATE_COMPONENT_REQUEST})

      const body = {
        position: values.position,
        company: values.company,
        start_date: values.start_date.toISOString().split('T')[0],
        is_current: values.is_current,
        duties: values.duties.filter((duty) => duty !== ''),
        end_date: values.end_date ? values.end_date.toISOString().split('T')[0] : null,
        references: values.references ? values.references : null,
      };

      if (values.location && values.location.street_address && values.location.postal_code && values.location.city) {
        body.location = {
          street_address: values.location.street_address,
          postal_code: values.location.postal_code,
          city: values.location.city,
        };
      }

      const { data } = await axios.post(`/candidates/${profile}/experience`, JSON.stringify(body), config)
      dispatch({
          type: CANDIDATE_COMPONENT_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: CANDIDATE_COMPONENT_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL
    })
  }
}

export const updateExperience = (profile, id, values) => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'))
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }
    try {
      dispatch({type: CANDIDATE_COMPONENT_REQUEST})

      const body = {
        position: values.position,
        company: values.company,
        start_date: values.start_date.toISOString().split('T')[0],
        is_current: values.is_current,
        duties: values.duties.filter((duty) => duty !== '')
      }

      if (values.location.street_address && values.location.postal_code && values.location.city) {
        body.location = {
          street_address: values.location.street_address,
          postal_code: values.location.postal_code,
          city: values.location.city,
        };
      }
      if (values.end_date) {
        body.end_date = values.end_date.toISOString().split('T')[0]
      }
      if (values.references) {
        body.references = values.references;
      }

      console.log(JSON.stringify(body))

      const { data } = await axios.put(`/candidates/${profile}/experience/${id}`, JSON.stringify(body), config)
      dispatch({
          type: CANDIDATE_COMPONENT_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: CANDIDATE_COMPONENT_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL
    })
  }
}

export const deleteExperience = (profile, id) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };
    try {
      dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

      const { data } = await axios.delete(`/candidates/${profile}/experience/${id}`, config);

      dispatch({
        type: CANDIDATE_COMPONENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CANDIDATE_COMPONENT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  }
};
import axios from 'axios'
import {
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,

  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,

  USER_DELETE_PROFILE_REQUEST,
  USER_DELETE_PROFILE_SUCCESS,
  USER_DELETE_PROFILE_FAIL,
} from '../constants/userConst'

export const getUserDetails = (id, userType) => async (dispatch) => {
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
      dispatch({type: USER_DETAILS_PROFILE_REQUEST})
  
      const { data } = 
      userType === 'Pracodawca' ? await axios.get(`/companies/${id}`, config)
      : null
  
      dispatch({
        type: USER_DETAILS_PROFILE_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({
        type:USER_DETAILS_PROFILE_FAIL,
        payload:error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
      })
    }
  } else {
    dispatch({
      type: USER_DETAILS_PROFILE_FAIL,
    })
  }
}

export const createUserProfile = (type, values) => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'))
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }

    const body = type === 'Pracodawca' ? 
    JSON.stringify({
      nip: values.nip,
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      location: values.location,
      website: values.website,
      description: values.description,
      image: values.image,
    }) : null

    console.log(body)

    try {
      dispatch({
        type: USER_CREATE_PROFILE_REQUEST
      })

      const { data } = type === 'Pracodawca' ?
      await axios.post(`/companies`, body, config)
      : null
      
      dispatch({
          type: USER_CREATE_PROFILE_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: USER_CREATE_PROFILE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: USER_CREATE_PROFILE_FAIL
    })
  }
}

export const updateUserProfile = (id, type, values) => async dispatch => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'))
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    }

    const body = type === 'Pracodawca' ? 
    JSON.stringify({
      nip: values.nip,
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      location: values.location,
      website: values.website,
      description: values.description,
      image: values.image,
    }) : null

    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST
      })

      const { data } = 
      type === 'Pracodawca' ? await axios.patch(`/companies/${id}`, body, config)
      : null

      dispatch({
          type: USER_UPDATE_PROFILE_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL
    })
  }
}


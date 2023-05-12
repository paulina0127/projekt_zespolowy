import axios from 'axios';
import {
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
  USER_DETAILS_PROFILE_FAIL,
  USER_DETAILS_PROFILE_REQUEST,
  USER_DETAILS_PROFILE_SUCCESS,
  USER_EXPERIENCE_FAIL,
  USER_EXPERIENCE_SUCCESS,
  USER_FILES_FAIL,
  USER_FILES_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConst';

export const getCandidateExperience = (id) => async (dispatch) => {
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
      const { data } = await axios.get(`/candidates/${id}/experience`, config);

      dispatch({
        type: USER_EXPERIENCE_SUCCESS,
        payload: data,
      });

      dispatch(getCandidateFiles(id));

    } catch (error) {
      dispatch({
        type: USER_EXPERIENCE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_EXPERIENCE_FAIL,
    });
  }
};

export const getCandidateFiles = (id) => async (dispatch) => {
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
      const { data } = await axios.get(`/candidates/${id}/files`, config);

      dispatch({
        type: USER_FILES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FILES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_FILES_FAIL,
    });
  }
};

export const getUserDetails = (id, userType) => async (dispatch) => {
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
      dispatch({ type: USER_DETAILS_PROFILE_REQUEST });

      const { data } =
        userType === 'Pracodawca'
          ? await axios.get(`/companies/${id}`, config)
          : await axios.get(`/candidates/${id}`, config);

      dispatch({
        type: USER_DETAILS_PROFILE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_DETAILS_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_DETAILS_PROFILE_FAIL,
    });
  }
};

export const createUserProfile = (type, values) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };

    const body =
      type === 'Pracodawca'
        ? JSON.stringify({
            nip: values.nip,
            name: values.name,
            phone_number: values.phone_number,
            email: values.email,
            location: values.location,
            website: values.website,
            description: values.description,
            image: values.image,
          })
        : null;

    try {
      dispatch({
        type: USER_CREATE_PROFILE_REQUEST,
      });

      const { data } =
        type === 'Pracodawca'
          ? await axios.post(`/companies`, body, config)
          : null;

      dispatch({
        type: USER_CREATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CREATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_CREATE_PROFILE_FAIL,
    });
  }
};

export const updateUserProfile = (id, type, values) => async (dispatch) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    };

    const body =
      type === 'Pracodawca'
        ? JSON.stringify({
            nip: values.nip,
            name: values.name,
            phone_number: values.phone_number,
            email: values.email,
            location: values.location,
            website: values.website,
            description: values.description,
            image: values.image,
          })
        : JSON.stringify({
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            location: values.location,
            email: values.email,
            pesel: values.pesel,
            image: values.image,
          });

    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const { data } =
        type === 'Pracodawca'
          ? await axios.patch(`/companies/${id}`, body, config)
          : await axios.patch(`/candidates/${id}`, body, config);

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  } else {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
    });
  }
};

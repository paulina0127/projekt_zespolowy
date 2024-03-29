import {
  CANDIDATE_COMPONENT_REQUEST,
  CANDIDATE_COMPONENT_SUCCESS,
  CANDIDATE_COMPONENT_FAIL,
} from '../constants/candidateConst';
import axios from 'axios';

const getAuthHeaders = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;
  return {
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  };
};

const getAuthHeadersMP = () => {
  const userTokens = JSON.parse(localStorage.getItem('userTokens'));
  const token = userTokens ? userTokens.access : null;
  return {
    'Content-Type': 'multipart/form-data',
    Authorization: `JWT ${token}`,
  };
};

export const deleteCandidateComponent =
  (profile, id, component) => async (dispatch) => {
    const config = { headers: getAuthHeaders() };
    try {
      dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

      const { data } = await axios.delete(
        `/candidates/${profile}/${component}/${id}`,
        config
      );

      dispatch({
        type: CANDIDATE_COMPONENT_SUCCESS,
      });
    } catch (error) {
      const errorKey = Object.keys(error?.response?.data || {})[0];
      dispatch({
        type: CANDIDATE_COMPONENT_FAIL,
        payload: errorKey ? error.response.data[errorKey] : error.message,
      });
    }
  };

export const createExperience = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = {
      position: values.position,
      company: values.company,
      start_date: values.start_date.toISOString().split('T')[0],
      is_current: values.is_current,
      duties: values.duties.filter((duty) => duty !== ''),
      end_date: values.end_date
        ? values.end_date.toISOString().split('T')[0]
        : null,
      references: values.references ? values.references : null,
      ...(values.location?.street_address &&
        values.location?.postal_code &&
        values.location?.city && {
          location: {
            street_address: values.location.street_address,
            postal_code: values.location.postal_code,
            city: values.location.city,
          },
        }),
    };

    const { data } = await axios.post(
      `/candidates/${profile}/experience`,
      JSON.stringify(body),
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateExperience = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = {
      position: values.position,
      company: values.company,
      start_date: values.start_date.toISOString().split('T')[0],
      is_current: values.is_current,
      duties: values.duties.filter((duty) => duty !== ''),
    };

    if (
      values.location.street_address &&
      values.location.postal_code &&
      values.location.city
    ) {
      body.location = {
        street_address: values.location.street_address,
        postal_code: values.location.postal_code,
        city: values.location.city,
      };
    }
    if (values.end_date) {
      body.end_date = values.end_date.toISOString().split('T')[0];
    }
    if (values.references) {
      body.references = values.references;
    }

    const { data } = await axios.put(
      `/candidates/${profile}/experience/${id}`,
      JSON.stringify(body),
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createEducation = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      institute: values.institute,
      education_level: values.education_level,
      major: values.major,
      start_date: values.start_date.toISOString().split('T')[0],
      end_date: values.end_date
        ? values.end_date.toISOString().split('T')[0]
        : null,
      diploma: values.diploma ? values.diploma : null,
      is_current: values.is_current,
    });

    const { data } = await axios.post(
      `/candidates/${profile}/education`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateEducation = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      institute: values.institute,
      education_level: values.education_level,
      start_date: values.start_date.toISOString().split('T')[0],
      is_current: values.is_current,
      ...(values.major && { major: values.major }),
      ...(values.end_date && {
        end_date: values.end_date.toISOString().split('T')[0],
      }),
      ...(values.diploma && { diploma: values.diploma }),
    });

    const { data } = await axios.put(
      `/candidates/${profile}/education/${id}`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createSkill = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      skill: values.skill,
      name: values.name,
      type: values.type,
      ...(values.level && { level: values.level }),
      ...(values.certificate && { certificate: values.certificate }),
    });

    const { data } = await axios.post(
      `/candidates/${profile}/skills`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateSkill = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      skill: values.skill,
      name: values.name,
      type: values.type,
      ...(values.level && { level: values.level }),
      ...(values.certificate && { certificate: values.certificate }),
    });

    const { data } = await axios.put(
      `/candidates/${profile}/skills/${id}`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createCourse = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      name: values.name,
      start_date: values.start_date.toISOString().split('T')[0],
      end_date: values.end_date.toISOString().split('T')[0],
      ...(values.description && { description: values.description }),
      ...(values.certificate && { certificate: values.certificate }),
    });

    const { data } = await axios.post(
      `/candidates/${profile}/courses`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateCourse = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      name: values.name,
      start_date: values.start_date.toISOString().split('T')[0],
      end_date: values.end_date.toISOString().split('T')[0],
      ...(values.description && { description: values.description }),
      ...(values.certificate && { certificate: values.certificate }),
    });

    const { data } = await axios.put(
      `/candidates/${profile}/courses/${id}`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createLink = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      type: values.type,
      url: values.url,
    });

    const { data } = await axios.post(
      `/candidates/${profile}/links`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateLink = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      type: values.type,
      url: values.url,
    });

    const { data } = await axios.put(
      `/candidates/${profile}/links/${id}`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createFile = (profile, values) => async (dispatch) => {
  const config = { headers: getAuthHeadersMP() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = {
      name: values.name,
      type: values.type,
      path: values.path,
    };

    const { data } = await axios.post(
      `/candidates/${profile}/files`,
      body,
      config
    );

    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const updateFile = (profile, id, values) => async (dispatch) => {
  const config = { headers: getAuthHeadersMP() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = {
      name: values.name,
      type: values.type,
      path: values.path,
    };

    const { data } = await axios.put(
      `/candidates/${profile}/files${id}`,
      body,
      config
    );
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

export const createApplication = (values) => async (dispatch) => {
  const config = { headers: getAuthHeaders() };
  try {
    dispatch({ type: CANDIDATE_COMPONENT_REQUEST });

    const body = JSON.stringify({
      offer: values.offer,
      type: values.type,
      ...(values.attachments && { attachments: values.attachments }),
    });

    const { data } = await axios.post(`/applications`, body, config);
    dispatch({
      type: CANDIDATE_COMPONENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorKey = Object.keys(error?.response?.data || {})[0];
    dispatch({
      type: CANDIDATE_COMPONENT_FAIL,
      payload: errorKey ? error.response.data[errorKey] : error.message,
    });
  }
};

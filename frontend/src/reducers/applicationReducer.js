import {
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_LIST_CLEAR,
  APPLICATION_DETAILS_CLEAR,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_RESET,
  APPLICATION_FAIL,
  APPLICATION_REQUEST,
  APPLICATION_SUCCESS,
} from '../constants/applicationConst';

export const applicationListReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_REQUEST:
      return { loading: true, applications: [] };
    case APPLICATION_LIST_SUCCESS:
      return {
        loading: false,
        applications: action.payload.results,
        length: action.payload.count,
      };
    case APPLICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_LIST_CLEAR:
      return { applications: [] };
    default:
      return state;
  }
};

export const applicationDetailsReducer = (
  state = { application: {} },
  action
) => {
  switch (action.type) {
    case APPLICATION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case APPLICATION_DETAILS_SUCCESS:
      return { loading: false, application: action.payload };
    case APPLICATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_DETAILS_CLEAR:
      return { application: {} };
    default:
      return state;
  }
};

export const applicationCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_REQUEST:
      return { loadingUpdate: true };
    case APPLICATION_SUCCESS:
      return { loadingUpdate: false, successUpdate: true };
    case APPLICATION_FAIL:
      return { loadingUpdae: false, errorUpdate: action.payload };
    case APPLICATION_RESET:
      return {};
    default:
      return state;
  }
};

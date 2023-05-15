import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_CLEAR,
  COMPANY_DETAILS_CLEAR,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
} from '../constants/companyConst';

export const companyListReducer = (state = { companies: [] }, action) => {
  switch (action.type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true, companies: [] };
    case COMPANY_LIST_SUCCESS:
      return { loading: false, companies: action.payload };
    case COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_LIST_CLEAR:
      return { companies: [] };
    default:
      return state;
  }
};

export const companyDetailsReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_DETAILS_REQUEST:
      return { loadingCompany: true, ...state };
    case COMPANY_DETAILS_SUCCESS:
      return { loadingCompany: false, company: action.payload };
    case COMPANY_DETAILS_FAIL:
      return { loadingCompany: false, errorCompany: action.payload };
    case COMPANY_DETAILS_CLEAR:
      return { company: {} };
    default:
      return state;
  }
};

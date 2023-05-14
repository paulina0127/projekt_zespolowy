import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_CLEAR,
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

import { 
  OFFER_LIST_REQUEST,
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  OFFER_DETAILS_CLEAR
} from "../constants/offerConst";

export const offerListReducer = (state = {offers:[]}, action) => {
  switch(action.type) {
    case OFFER_LIST_REQUEST:
      return {loading:true, offers:[]}
    case OFFER_LIST_SUCCESS:
      return {loading:false, offers: action.payload}
    case OFFER_LIST_FAIL:
      return {loading:false, error: action.payload} 
    default:
      return state     
  }
}

export const offerDetailsReducer = (state = {offer:{}}, action) => {
  switch(action.type) {
    case OFFER_DETAILS_REQUEST:
      return {loading:true, ...state}
    case OFFER_DETAILS_SUCCESS:
      return {loading:false, offer: action.payload}
    case OFFER_DETAILS_FAIL:
      return {loading:false, error: action.payload} 
    case OFFER_DETAILS_CLEAR:
      return { offer: {} };
    default:
      return state     
  }
}
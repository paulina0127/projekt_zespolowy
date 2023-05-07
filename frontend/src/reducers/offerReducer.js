import { 
  OFFER_FILTERED_LIST_REQUEST,
  OFFER_FILTERED_LIST_SUCCESS,
  OFFER_FILTERED_LIST_FAIL,
  OFFER_FILTERED_LIST_CLEAR,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  OFFER_DETAILS_CLEAR,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_CREATE_FAIL,
  OFFER_CREATE_RESET,
  OFFER_DELETE_REQUEST,
  OFFER_DELETE_SUCCESS,
  OFFER_DELETE_FAIL,
  OFFER_DELETE_RESET,
} from '../constants/offerConst'


export const offerListReducer = (state = {offers:[]}, action) => {
  switch (action.type) {
    case OFFER_FILTERED_LIST_REQUEST:
      return { loading: true }
    case OFFER_FILTERED_LIST_SUCCESS:
      return { loading: false, offers: action.payload.results, length: action.payload.count }
    case OFFER_FILTERED_LIST_FAIL:
      return { loading: false, error: action.payload }
    case OFFER_FILTERED_LIST_CLEAR:
      return { offers: [] }
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
      return { offer: {} }
    default:
      return state     
  }
}

export const offerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_CREATE_REQUEST:
      return { loading: true }
    case OFFER_CREATE_SUCCESS:
      return { loading: false, success: true }
    case OFFER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case OFFER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const offerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_DELETE_REQUEST:
      return { loadingDeleteOffer: true }
    case OFFER_DELETE_SUCCESS:
      return { loadingDeleteOffer: false, successDeleteOffer: true }
    case OFFER_DELETE_FAIL:
      return { loadingDeleteOffer: false, errorDeleteOffer: action.payload }
    case OFFER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
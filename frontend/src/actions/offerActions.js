import axios from "axios";
import { 
  OFFER_LIST_REQUEST,
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_FILTERED_LIST_REQUEST,
  OFFER_FILTERED_LIST_SUCCESS,
  OFFER_FILTERED_LIST_FAIL,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
} from "../constants/offerConst";

export const listOffers = () => async dispatch => {
  try {
    dispatch({type: OFFER_LIST_REQUEST});
    const { data } = await axios.get('/offers');

    dispatch({
      type: OFFER_LIST_SUCCESS,
      payload: data.results
    });

  } catch (error) {
    dispatch({
      type:OFFER_LIST_FAIL,
      payload:error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message
    });
  }
}

export const listFilteredOffers = filters => async dispatch => {
  try {
    dispatch({ type: OFFER_FILTERED_LIST_REQUEST });

    // convert filters object to query string
    let query = "";
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => {
          if (val !== "") {
            query += `&${key}=${val}`;
          }
        });
      } else if (value !== "") {
        query += `&${key}=${value}`;
      }
    });
    query = query.substring(1);
  
    const { data } = await axios.get(`/offers?${query}`)

    dispatch({ 
      type: OFFER_FILTERED_LIST_SUCCESS, 
      payload: data 
    });

  } catch (error) {
    dispatch({ 
      type: OFFER_FILTERED_LIST_FAIL, 
      payload:error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message
    });
  }
};

export const listOfferDetails = id => async dispatch => {
  try {
    dispatch({type: OFFER_DETAILS_REQUEST});

    const { data } = await axios.get(`/offers/${id}`)

    dispatch({
      type: OFFER_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type:OFFER_DETAILS_FAIL,
      payload:error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message,
    });
  }
}



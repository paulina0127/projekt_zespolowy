import axios from "axios";
import { 
  OFFER_FILTERED_LIST_REQUEST,
  OFFER_FILTERED_LIST_SUCCESS,
  OFFER_FILTERED_LIST_FAIL,
  OFFER_DETAILS_REQUEST,
  OFFER_DETAILS_SUCCESS,
  OFFER_DETAILS_FAIL,
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_CREATE_FAIL,
} from "../constants/offerConst";

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

export const createOffer = () => async (dispatch, getState) => {
  if (localStorage.getItem('userTokens')) {
    const userTokens = JSON.parse(localStorage.getItem('userTokens'));
    const token = userTokens.access
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json'
      }
    }

    try {
      dispatch({
        type: OFFER_CREATE_REQUEST
      })

      // body

      const { data } = await axios.post(`/offers/`, config)
      dispatch({
          type: OFFER_CREATE_SUCCESS,
          payload: data,
      })

    } catch (error) {
      dispatch({
        type: OFFER_CREATE_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  } else {
    dispatch({
      type: OFFER_CREATE_FAIL
    });
  }
};





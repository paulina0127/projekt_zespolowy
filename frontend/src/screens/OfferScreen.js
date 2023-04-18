import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listOfferDetails } from "../actions/offerActions"

import Loader from '../components/Loader';
import Message from '../components/Message';

const OfferScreen = () => {

  const offer_id = useParams().id;
  const dispatch = useDispatch();
  const offerDetails = useSelector(state => state.offerDetails);
  const { error, loading, offer } = offerDetails;

  useEffect(() => {
    dispatch(listOfferDetails(offer_id));
    }, [dispatch ,offer_id]);

  return (
    <div>
      <h1>Offer: {offer.position}</h1>
    </div>
  )
}

export default OfferScreen
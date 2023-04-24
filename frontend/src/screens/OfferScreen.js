import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOfferDetails } from "../actions/offerActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import OfferPoint from "../components/OfferPoint";
import {IoRibbonOutline , IoInvertMode, IoBarChart, IoCalendarOutline, IoCalendarSharp, IoDocumentsOutline} from 'react-icons/io5';
import { GiReceiveMoney } from 'react-icons/gi'
import { MdWorkHistory } from 'react-icons/md'

const OfferScreen = () => {
  const offer_id = useParams().id;
  const dispatch = useDispatch();
  // const location = offer.location.street_address + ", " + offer.location.postal_code + " " + offer.location.city;
  const offerDetails = useSelector((state) => state.offerDetails);
  const { error, loading, offer } = offerDetails;

  // doesnt working
  useEffect(() => {
    dispatch(listOfferDetails(offer_id));
  }, [dispatch, offer_id, listOfferDetails]);



  return (
    <>
    {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
        :
        <div className="container px-4 py-5" id="icon-grid">
          <h2 className="pb-2 border-bottom">
            {offer.position}  
          </h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-5">
          <OfferPoint 
            text={offer.position_level}
            name='Poziom stanowiska'
            icon={<IoBarChart style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.contract_type.join(', ')}
            name='Rodzaj umowy'
            icon={<IoDocumentsOutline style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.salary}
            name='Wynagrodzenie'
            icon={<GiReceiveMoney style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.working_mode}
            name='Tryb pracy'
            icon={<IoInvertMode style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.working_time}
            name='Wymiar pracy'
            icon={<IoRibbonOutline style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.created_date.slice(0, 10)}
            name='Oferta dodana: '
            icon={<IoCalendarOutline style={{fontSize: '1.3rem',}}/>}
          />
          <OfferPoint 
            text={offer.expiration_date.slice(0, 10)}
            name='Oferta ważna do: '
            icon={<MdWorkHistory style={{fontSize: '1.3rem',}}/>}
          />
      </div>
    </div>
    }
    </> 
  );
};

export default OfferScreen;

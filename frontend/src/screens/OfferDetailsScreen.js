import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOfferDetails } from "../actions/offerActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import OfferPoint from "../components/OfferPoint";
import { IoConstruct, IoLocationOutline, IoInvertMode, IoBarChart, IoCalendarOutline, IoDocumentsOutline} from 'react-icons/io5';
import { GiReceiveMoney } from 'react-icons/gi'
import { SiPolywork } from 'react-icons/si'
import { MdWorkHistory } from 'react-icons/md'
import { FiCheckCircle } from 'react-icons/fi'
import { OFFER_DETAILS_CLEAR } from "../constants/offerConst";

import styles from './OfferDetailsScreen.module.css'

const OfferDetailsScreen = () => {
  const offer_id = useParams().id;
  const dispatch = useDispatch();
  
  const offerDetails = useSelector((state) => state.offerDetails);
  const { error, loading, offer } = offerDetails;
  const location = offer && offer.location ? offer.location.street_address + ", " + offer.location.postal_code + " " + offer.location.city : '';
  
  useEffect(() => {
    dispatch(listOfferDetails(offer_id));

    return () => {
      dispatch({ type: OFFER_DETAILS_CLEAR });
    }
  }, [dispatch, offer_id]);


  return (
    <>
    { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : Object.keys(offer).length === 0 ? null 
      : 
        <>
          <div className="container px-4 py-5 bg-white border shadow rounded my-3">
            <div className="d-md-flex align-items-center pb-2 border-bottom">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80" 
                alt="company pic"
                className={styles.brandImg}
                />
              <div>
                <h2>
                  {offer.position}  
                </h2>
                <Link to={`/companies/${offer.company.id}`}>
                  <p className="text-primary"><strong>{offer.company.name}</strong></p>
                </Link> 
              </div>
              <div className={styles.salary}>
                <GiReceiveMoney />
                <div className="mt-0 font-weight-bold">
                  <strong>{offer.salary} zł</strong>
                  <p className="mt-2">brutto / mies.</p>
                </div>

              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-4 py-5">
              <OfferPoint 
                text={offer.position_level}
                name='Poziom stanowiska'
                icon={<IoBarChart />}
              />
              <OfferPoint 
                text={offer.category.name}
                name='Dziedzina'
                icon={<IoConstruct />}
              />
              <OfferPoint 
                text={location}
                name='Lokalizacja: '
                icon={<IoLocationOutline />}
              />
              <OfferPoint 
                text={offer.contract_type.join(', ')}
                name='Rodzaj umowy'
                icon={<IoDocumentsOutline />}
              />
              <OfferPoint 
                text={offer.working_mode}
                name='Tryb pracy'
                icon={<IoInvertMode />}
              />
              <OfferPoint 
                text={offer.working_time}
                name='Wymiar pracy'
                icon={<SiPolywork />}
              />
              <OfferPoint 
                text={offer.created_date.slice(0, 10)}
                name='Oferta dodana: '
                icon={<IoCalendarOutline />}
              />
              <OfferPoint 
                text={offer.expiration_date.slice(0, 10)}
                name='Oferta ważna do: '
                icon={<MdWorkHistory />}
              />
            </div>
            <button className="btn btn-warning rounded-pill w-100">Aplikuj</button>
          </div> 
          <div className="container px-4 py-5 bg-white border shadow rounded my-3">
            <h2 className="pb-2 border-bottom">
              Twoje obowiązki
            </h2>
            <ul className="list-group list-group-flush">
            {offer.duties.map(duty => <li className="list-group-item"><FiCheckCircle/> {duty}</li>
            )}
            </ul>
          </div>
          <div className="container px-4 py-5 bg-white border shadow rounded my-3">
            <h2 className="pb-2 border-bottom">
              Nasze wymagania
            </h2>
            <ul className="list-group list-group-flush">
            {offer.requirements.map(req => <li className="list-group-item"><FiCheckCircle/> {req.name}</li>
            )}
            </ul>
          </div>
          <div className="container px-4 py-5 bg-white border shadow rounded my-3">
            <h2 className="pb-2 border-bottom">
              Zalety
            </h2>
            <ul className="list-group list-group-flush">
            {offer.advantages.map(adv => <li className="list-group-item"><FiCheckCircle/> {adv}</li>
            )}
            </ul>
          </div>
        </>
    }
    </> 
  );
};

export default OfferDetailsScreen;

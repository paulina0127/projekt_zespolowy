import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listOfferDetails } from '../actions/offerActions';
import { SuccessApplicationModal } from '../components/candidate';
import { FiCheckCircle } from 'react-icons/fi';
import { GiReceiveMoney } from 'react-icons/gi';
import {
  IoBarChart,
  IoCalendarOutline,
  IoConstruct,
  IoDocumentsOutline,
  IoInvertMode,
  IoLocationOutline,
} from 'react-icons/io5';
import { MdWorkHistory } from 'react-icons/md';
import { SiPolywork } from 'react-icons/si';
import { Loader, Message } from '../components/basics';
import { OfferPoint } from '../components/offers';
import { OFFER_DETAILS_CLEAR } from '../constants/offerConst';
import { NewApplication } from '../components/candidate';
import styles from './OfferDetailsScreen.module.css';

const OfferDetailsScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const user = useSelector((state) => state.auth.user);
  const success = useSelector((state) => state.candidate.success);

  const offer_id = useParams().id;
  const dispatch = useDispatch();

  const offerDetails = useSelector((state) => state.offerDetails);
  const { error, loading, offer } = offerDetails;
  const location =
    offer && offer.location
      ? offer.location.street_address +
        ', ' +
        offer.location.postal_code +
        ' ' +
        offer.location.city
      : '';

  useEffect(() => {
    dispatch(listOfferDetails(offer_id));

    return () => {
      dispatch({ type: OFFER_DETAILS_CLEAR });
    };
  }, [dispatch, offer_id]);

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 200px - 65px)' }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : Object.keys(offer).length === 0 ? null : (
          <>
            <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
              <div className='d-md-flex align-items-center pb-2 border-bottom'>
                <Link to={`/companies/${offer.company.id}`}>
                  <img
                    src={offer.company.image}
                    alt='Company pic'
                    className={styles.brandImg}
                  />
                </Link>
                <div>
                  <h2>{offer.position}</h2>
                  <Link to={`/companies/${offer.company.id}`}>
                    <p className='text-primary'>
                      <strong>{offer.company.name}</strong>
                    </p>
                  </Link>
                </div>
                <div className={styles.salary}>
                  <GiReceiveMoney />
                  <div className='mt-0 font-weight-bold'>
                    <strong>{offer.salary} zł</strong>
                    <p className='mt-2'>brutto / mies.</p>
                  </div>
                </div>
              </div>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-4 py-5'>
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
              <button
                className='btn btn-warning rounded-pill w-100'
                onClick={handleApplyClick}
                style={{ backgroundColor: 'var(--yellow)' }}
              >
                Aplikuj
              </button>
            </div>
            <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
              <h2 className='pb-2 border-bottom'>Twoje obowiązki</h2>
              <ul className='list-group list-group-flush'>
                {offer.duties.map((duty) => (
                  <li className='list-group-item'>
                    <FiCheckCircle /> {duty}
                  </li>
                ))}
              </ul>
            </div>
            <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
              <h2 className='pb-2 border-bottom'>Nasze wymagania</h2>
              <ul className='list-group list-group-flush'>
                {offer.requirements.map((req) => (
                  <li className='list-group-item'>
                    <FiCheckCircle /> {req.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
              <h2 className='pb-2 border-bottom'>Zalety</h2>
              <ul className='list-group list-group-flush'>
                {offer.advantages.map((adv) => (
                  <li className='list-group-item'>
                    <FiCheckCircle /> {adv}
                  </li>
                ))}
              </ul>
            </div>
            {showModal && user !== null && user?.profile !== null && (
              <NewApplication
                offer={offer}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
              />
            )}
            {success && <SuccessApplicationModal showModal={success} />}
          </>
        )}
      </div>
    </>
  );
};

export default OfferDetailsScreen;

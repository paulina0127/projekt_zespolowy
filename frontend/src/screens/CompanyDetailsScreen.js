import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineLocalPhone, MdOutlineAlternateEmail } from 'react-icons/md';
import { GrTextAlignFull } from 'react-icons/gr';
import { TbWorldWww } from 'react-icons/tb';
import { OfferPoint } from '../components/offers';
import { COMPANY_DETAILS_CLEAR } from '../constants/companyConst';
import { listCompanyDetails } from '../actions/companyActions';
import styles from './OfferDetailsScreen.module.css';
import { Loader, Message } from '../components/basics';
import { Offer } from '../components/offers';
import { listFilteredOffers } from '../actions/offerActions';
import { OFFER_FILTERED_LIST_CLEAR } from '../constants/offerConst';

const CompanyDetailsScreen = () => {
  const company_id = useParams().id;
  const dispatch = useDispatch();

  const companyDetails = useSelector((state) => state.companyDetails);
  const { errorCompany, loadingCompany, company } = companyDetails;

  const offerList = useSelector((state) => state.offerList);
  const { offers, loading, length, error } = offerList;

  const params = {
    company: company_id,
  };

  const location =
    company && company.location
      ? company.location.street_address +
        ', ' +
        company.location.postal_code +
        ' ' +
        company.location.city
      : '';

  useEffect(() => {
    dispatch(listCompanyDetails(company_id));

    return () => {
      dispatch({ type: COMPANY_DETAILS_CLEAR });
    };
  }, [dispatch, company_id]);

  useEffect(() => {
    dispatch(listFilteredOffers(params));
    return () => {
      dispatch({ type: OFFER_FILTERED_LIST_CLEAR });
    };
  }, []);

  return (
    <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
      {loadingCompany ? (
        <Loader />
      ) : errorCompany ? (
        <Message variant='danger'>{errorCompany}</Message>
      ) : Object.keys(company).length === 0 ? null : (
        <>
          <div className='d-md-flex align-items-center pb-2 border-bottom'>
            <Link>
              <img
                src={company.image}
                alt='Company logo'
                className={styles.brandImg}
              />
            </Link>
            <div>
              <h2>{company.name}</h2>
              {/*Tu może być link z lokalizacją na Google Maps na podstawie https://developers.google.com/maps/documentation/urls/get-started - czyli np.
              https://www.google.com/maps/@?api=1&map_action=map&Olsztyn itd */}
              <Link>
                <p className='text-primary'>
                  <strong>
                    {company.location?.city}
                    <IoLocationOutline />
                  </strong>
                </p>
              </Link>
            </div>
          </div>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-4 py-5 mb-4 pb-0'>
            <OfferPoint
              text={location}
              name='Lokalizacja'
              icon={<IoLocationOutline />}
            />
            <OfferPoint
              text={company.phone_number}
              name='Numer telefonu'
              icon={<MdOutlineLocalPhone />}
            />
            {company.website && (
              <Link to={company.website}>
                <OfferPoint
                  text={company.website}
                  name='Strona internetowa'
                  icon={<TbWorldWww />}
                />
              </Link>
            )}
            <OfferPoint
              text={company.email}
              name='Email'
              icon={<MdOutlineAlternateEmail />}
            />
          </div>
          <div className='row row-cols-12'>
            <p className='fs-4 mt-2 mb-5'>{company.description}</p>
          </div>
        </>
      )}
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : length === 0 ? null : (
          <>
            <h2 className='pb-2 border-bottom'>Nasze oferty</h2>
            <ul className='col-12'>
              {offers?.map((offer) => (
                <Offer key={offer.id} offer={offer} />
              ))}
            </ul>
          </>
        )}
      </>
    </div>
  );
};

export default CompanyDetailsScreen;

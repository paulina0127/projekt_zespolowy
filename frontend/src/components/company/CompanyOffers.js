import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listFilteredOffers } from '../../actions/offerActions';
import { OFFER_FILTERED_LIST_CLEAR } from '../../constants/offerConst';
import { OFFER_DELETE_RESET } from '../../constants/offerConst';
import OfferForCompany from './OfferForCompany';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import { Loader, Message, Pagination } from '../basics';
import ReceivedApplication from './ReceivedApplication';
import OfferForm from './OfferForm';

import styles from '../../screens/MainPanelScreen.module.css';
import styles2 from './OfferForCompany.module.css';

const CompanyOffers = () => {
  const [page, setPage] = useState(1);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const showApplicationsHandler = (id) => setShowApplications(id);
  const editOfferHandler = (offer) => setSelectedOffer(offer);

  const company_id = useSelector((state) => state.auth.user?.profile?.id);

  const offerList = useSelector((state) => state.offerList);
  const { offers, loading, length, error } = offerList;

  const offerDelete = useSelector((state) => state.offerDelete);
  const { successDeleteOffer, errorDeleteOffer, loadingDeleteOffer } =
    offerDelete;

  const pageSize = 5;
  const handleClickBack = () => setPage(page - 1);
  const handleClickForward = () => setPage(page + 1);

  const dispatch = useDispatch();

  const params = {
    all: true,
    company: company_id,
    page: page,
  };

  useEffect(() => {
    return () => {
      dispatch({ type: OFFER_DELETE_RESET });
    };
  }, []);

  useEffect(() => {
    dispatch(listFilteredOffers(params));
    return () => {
      dispatch({ type: OFFER_FILTERED_LIST_CLEAR });
    };
  }, [dispatch, successDeleteOffer, page]);

  return (
    <>
      {showApplications ? (
        <ReceivedApplication
          offer_id={showApplications}
          show={showApplicationsHandler}
        />
      ) : selectedOffer ? (
        <UserPanelLayout>
          <div className='container justify-content-center px-4 py-5 my-3'>
            <button
              className='btn btn-dark rounded-pill mb-3'
              onClick={() => editOfferHandler(false)}
            >
              <BiArrowBack /> Wróć
            </button>
            <h2 className={styles['panel-h2']}>Edycja oferty pracy:</h2>
            <div className='shadow p-3 bg-white rounded-5 m-2'>
              <OfferForm offer={selectedOffer} type='update' />
            </div>
          </div>
        </UserPanelLayout>
      ) : (
        <UserPanelLayout>
          <div className='container justify-content-center px-4 py-5 my-3'>
            <Link to='/user-panel/nowa-oferta'>
              <button
                className={`btn btn-success rounded-circle ${styles2.addOfferBtn}`}
              >
                <AiOutlineFileAdd />
              </button>
            </Link>
            {loadingDeleteOffer && <Loader />}
            {errorDeleteOffer && (
              <Message variant='danger'>{errorDeleteOffer}</Message>
            )}
            {successDeleteOffer && (
              <Message variant='success'>Oferta pracy została usunięta</Message>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : length === 0 ? (
              <Message variant='info'>
                Nie dodano jeszcze żadnych ofert pracy
              </Message>
            ) : (
              <>
                <ul className='col-12'>
                  <h2 className={styles['panel-h2']}>
                    Moje oferty pracy: {length}
                  </h2>
                  {offers.map((offer) => (
                    <OfferForCompany
                      key={offer.id}
                      offer={offer}
                      handleShowApplications={showApplicationsHandler}
                      handleEditOffer={editOfferHandler}
                    />
                  ))}
                </ul>
                <div className='d-flex mt-5 justify-content-center'>
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    count={length}
                    clickBack={handleClickBack}
                    clickForward={handleClickForward}
                  />
                </div>
              </>
            )}
          </div>
        </UserPanelLayout>
      )}
    </>
  );
};

export default CompanyOffers;

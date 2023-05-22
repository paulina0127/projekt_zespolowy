import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Modal } from 'react-bootstrap';
import ReceivedApplicationItem from './ReceivedApplicationItem';
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst';
import {
  listApplications,
  updateApplication,
} from '../../actions/applicationActions';
import { Loader, Message, MyModal, Pagination } from '../basics';
import CompanyApplicationInfo from './CompanyApplicationInfo';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import ApplicationEvaluationForm from './ApplicationEvaluationForm';
import styles from '../company/CompanyProfileForm.module.css';
import styles2 from '../company/OfferForCompany.module.css';
import { BiArrowBack } from 'react-icons/bi';
import { HiPhone, HiOutlineLocationMarker } from 'react-icons/hi';

const ReceivedApplication = ({ offer_id, show }) => {
  const [changeAppStatusIndex, setAppStatusIndex] = useState(null);
  const [addNotes, setAddNotes] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [statusType, setStatusType] = useState('');
  const { applications, loading, length, error } = useSelector(
    (state) => state.applicationList
  );
  const success = useSelector((state) => state.applicationChanges);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  const dispatch = useDispatch();

  const handleShowModal = (index, type) => {
    setAppStatusIndex(index);
    setStatusType(type);
  };

  const handleCloseModal = () => setAppStatusIndex(null);

  const handleShowEditModal = (index) => setAddNotes(index);
  const handleCloseEditModal = () => setAddNotes(null);

  const handleShowCandidateModal = (index) => setCandidate(index);
  const handleCloseCandidateModal = () => setCandidate(null);

  const handleChageStatusApplication = (id, type) => {
    const value = { status: '' };
    if (type === 'accept') {
      value.status = 'Zaakceptowana';
    } else if (type === 'reject') {
      value.status = 'Odrzucona';
    }
    dispatch(updateApplication(id, value));
    setAppStatusIndex(null);
  };

  useEffect(() => {
    dispatch(listApplications({ page: page }));
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR });
    };
  }, [dispatch, success, page]);

  const filteredApplications = !loading
    ? applications.filter(
        (application) =>
          application.status === 'Złożona' &&
          (offer_id ? application.offer.id === offer_id : true)
      )
    : [];

  return (
    <UserPanelLayout>
      {offer_id ? (
        <button
          className='btn btn-dark rounded-pill mt-3'
          onClick={() => show(false)}
        >
          <BiArrowBack /> Wróć
        </button>
      ) : (
        ''
      )}
      <h2 className={styles['profile-h2']}>Otrzymane aplikacje</h2>
      <div
        className={`shadow pd-2 bg-warning rounded-pill mx-5 px-5 ${styles2['container-app']}`}
      >
        <Row className='d-flex align-items-center justify-content-around col-lg-12'>
          <Col lg={3}>
            <h4 className={styles['profile-h4']}>Kandydat</h4>
          </Col>
          <Col lg={2}>
            <h4 className={styles['profile-h4']}>Stanowisko</h4>
          </Col>
          <Col lg={2}>
            <h4 className={styles['profile-h4']}>Złożono</h4>
          </Col>
          <Col lg={2}>
            <h4 className={styles['profile-h4']}>Status</h4>
          </Col>
          <Col lg={3}>
            <h4 className={styles['profile-h4']}>Akcje</h4>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : filteredApplications.length === 0 ? (
        <Message variant='primary'>Brak aplikacji</Message>
      ) : (
        filteredApplications.map((application, index) => (
          <Fragment key={application.id}>
            <ReceivedApplicationItem
              application={application}
              index={index}
              handleShowModal={handleShowModal}
              handleShowEditModal={handleShowEditModal}
              handleShowCandidateModal={handleShowCandidateModal}
              display={true}
            />
            {changeAppStatusIndex === index && (
              <MyModal
                showModal={true}
                title={
                  statusType === 'accept'
                    ? 'Akceptowanie aplikacji'
                    : 'Odrzucanie aplikacji'
                }
                danger={statusType === 'reject' ? true : 'accept'}
              >
                <CompanyApplicationInfo
                  type={statusType}
                  name='tę aplikację'
                  handleCloseModal={handleCloseModal}
                  handleChangeStatus={handleChageStatusApplication}
                  id={application.id}
                />
              </MyModal>
            )}
            {addNotes === index && (
              <MyModal showModal={true} title='Notatki i ocena'>
                <ApplicationEvaluationForm
                  application={application}
                  handleCloseModal={handleCloseEditModal}
                />
              </MyModal>
            )}
            {candidate === index && (
              <Modal
                show={true}
                onHide={() => handleCloseCandidateModal()}
                centered
              >
                <div className={styles2.card}>
                  <div className={styles2['img-placeholder']}>
                    <img src={application.candidate.image} />
                  </div>
                  <div>
                    <h3 className='border-bottom mb-3'>
                      {application.candidate.first_name +
                        ' ' +
                        application.candidate.last_name}
                    </h3>
                    <p>
                      <HiPhone />
                      {application.candidate.phone_number}
                    </p>
                    <p>
                      <HiOutlineLocationMarker />
                      {application.candidate.location.street_address +
                        ', ' +
                        application.candidate.location.postal_code +
                        ' ' +
                        application.candidate.location.city}
                    </p>
                  </div>
                </div>
              </Modal>
            )}
          </Fragment>
        ))
      )}
      <div
        className={`d-flex mt-5 justify-content-center mx-5 ${styles2['container-app']}`}
      >
        <Pagination
          page={page}
          pageSize={pageSize}
          count={length}
          clickBack={handleClickBack}
          clickForward={handleClickForward}
        />
      </div>
    </UserPanelLayout>
  );
};

export default ReceivedApplication;

import { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Modal, Row, Col } from 'react-bootstrap';
import { getUserDetails, getCandidateFiles } from '../../actions/userActions';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import { Loader, Message } from '../basics';
import ApplicationForm from './ApplicationForm';
import styles from './NewApplication.module.css';

const NewApplication = ({
  offer,
  isAuthenticated,
  showModal,
  handleCloseModal,
}) => {
  const [applyMethod, setApplyMethod] = useState('Profil kandydata');

  const handleMethodChange = (e) => {
    const target = e.target;
    if (target.checked) {
      setApplyMethod(target.value);
    }
  };

  const profile = useSelector((state) => state.auth.user?.profile);
  const { user, filesList } = useSelector((state) => state.userProfileDetails);
  const { success, loading, error } = useSelector((state) => state.candidate);

  if (success) {
    handleCloseModal();
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(profile.id, 'Kandydat'));
    dispatch(getCandidateFiles(profile.id));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [profile, dispatch]);

  const initialValues = {
    offer: offer.id,
  };

  if (!isAuthenticated) {
    return <Message variant='info'>Zaloguj się, aby móc aplikować</Message>;
  }

  return (
    <Modal
      show={showModal}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header className='bg-warning'>
        <Modal.Title>
          Potwierdzenie aplikacji na stanowisko
          <h4>
            <strong>{offer.position}</strong>
          </h4>
          <div className={`mt-3 ${styles['radio_container']}`}>
            <input
              onChange={handleMethodChange}
              type='radio'
              name='applyMethod'
              id='profile'
              value='Profil kandydata'
              checked={applyMethod === 'Profil kandydata'}
            />
            <label htmlFor='profile'>Aplikuję profilem kandydata</label>
            <input
              onChange={handleMethodChange}
              type='radio'
              name='applyMethod'
              id='cv'
              value='CV'
              checked={applyMethod === 'CV'}
            />
            <label htmlFor='cv'>Aplikuję CV</label>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader />
        ) : user && user.location && filesList !== undefined ? (
          <Row>
            {error && <Message variant='danger'>Aplikacja została już złożona dla tej oferty.</Message>}
            <Col md={12} className='justify-content-center'>
              <h4>Twoje dane osobowe</h4>
              <h6>Imię: {user.first_name}</h6>
              <h6>Nazwisko: {user.last_name}</h6>
              <h6>Telefon: {user.phone_number}</h6>
              <h6>PESEL: {user.pesel}</h6>
              <h6>Ulica (nazwa i numer): {user.location.street_address}</h6>
              <h6>Kod pocztowy: {user.location.postal_code}</h6>
              <h6>Miasto: {user.location.city}</h6>
            </Col>
            <Row className='my-3'>
              <ApplicationForm
                initialValues={initialValues}
                filesList={filesList}
                handleCloseModal={handleCloseModal}
                applyMethod={applyMethod}
              />
            </Row>
          </Row>
        ) : (
          ''
        )}
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getUserDetails })(NewApplication);

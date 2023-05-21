import UserPanelLayout from '../../hocs/UserPanelLayout';
import styles from '../../screens/MainPanelScreen.module.css';
import { Navigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listApplicationDetails } from '../../actions/applicationActions';
import { APPLICATION_DETAILS_CLEAR } from '../../constants/applicationConst';
import { useEffect } from 'react';
import { Loader, Message } from '../../components/basics';

const ApplicationDetails = () => {
  const application_id = useParams().id;

  const dispatch = useDispatch();

  const { application, loading, error } = useSelector(
    (state) => state.applicationDetails
  );

  useEffect(() => {
    dispatch(listApplicationDetails(application_id));
    return () => {
      dispatch({ type: APPLICATION_DETAILS_CLEAR });
    };
  }, []);

  return (
    <UserPanelLayout>
      <div className='container justify-content-center px-4 py-5 my-3'>
        <Link to={'/user-panel/aplikacje'}>
          <button className='btn btn-dark rounded-pill mb-3'>
            <BiArrowBack /> Wróć
          </button>
        </Link>
        <h2 className={styles['panel-h2']}>Szczegóły aplikacji</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : Object.keys(application).length === 0 ? null : (
          <div className='shadow p-3 bg-white rounded-5 m-2'>
            <div className='d-grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className='d-flex flex-column p-4'>
                <h4 className={styles['panel-h4']}>Dane osobowe</h4>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Imię i nazwisko</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.first_name} ${application.candidate.last_name}`}</p>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Adres zamieszkania</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.location.street_address}, ${application.candidate.location.postal_code}  ${application.candidate.location.city}`}</p>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Numer telefonu</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.phone_number}`}</p>
                </div>
              </div>
              <div className='d-flex flex-column p-4'>
                <h4 className={styles['panel-h4']}>Ocena kandydata</h4>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Ocena kompetencji</h5>
                  <div className='d-flex'>
                    <div className={styles['star-rating']}>
                      <input
                        id='star-5'
                        type='radio'
                        name='mark'
                        value={5}
                        checked={application.mark === 5}
                        readOnly={true}
                      />
                      <label htmlFor='star-5' title='5 stars'>
                        <i className='active fa fa-star' aria-hidden='true'></i>
                      </label>
                      <input
                        id='star-4'
                        type='radio'
                        name='mark'
                        value={4}
                        checked={application.mark <= 4}
                        readOnly={true}
                      />
                      <label htmlFor='star-4' title='4 stars'>
                        <i className='active fa fa-star' aria-hidden='true'></i>
                      </label>
                      <input
                        id='star-3'
                        type='radio'
                        name='mark'
                        value={3}
                        checked={application.mark <= 3}
                        readOnly={true}
                      />
                      <label htmlFor='star-3' title='3 stars'>
                        <i className='active fa fa-star' aria-hidden='true'></i>
                      </label>
                      <input
                        id='star-2'
                        type='radio'
                        name='mark'
                        value={2}
                        checked={application.mark <= 2}
                        readOnly={true}
                      />
                      <label htmlFor='star-2' title='2 stars'>
                        <i className='active fa fa-star' aria-hidden='true'></i>
                      </label>
                      <input
                        id='star-1'
                        type='radio'
                        name='mark'
                        value={1}
                        checked={application.mark >= 1}
                        readOnly={true}
                      />
                      <label htmlFor='star-1' title='1 star'>
                        <i className='active fa fa-star' aria-hidden='true'></i>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Notatki</h5>
                  <textarea
                    value={application.notes}
                    readOnly={true}
                    className='form-control rounded border-2 shadow-sm px-4'
                  />
                </div>
              </div>
            </div>
            {application.type === 'Profil kandydata' ? (
              <>
                {application.candidate?.experience?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Doświadczenie</h4>
                  </div>
                )}
                {application.candidate?.education?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Wykształcenie</h4>
                  </div>
                )}
                {application.candidate?.skills?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Umiejętności</h4>
                  </div>
                )}
                {application.candidate?.skills?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Kursy</h4>
                  </div>
                )}
                {application.candidate?.links?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Linki</h4>
                  </div>
                )}
              </>
            ) : (
              <>
                {application.attachments?.length > 0 && (
                  <div className='d-flex flex-column p-4'>
                    <h4 className={styles['panel-h4']}>Załączniki</h4>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </UserPanelLayout>
  );
};

export default ApplicationDetails;

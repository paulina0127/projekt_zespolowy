import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import ApplicationItem from './ApplicationItem';
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst';
import { listApplications } from '../../actions/applicationActions';
import { Loader, Message, Pagination } from '../basics';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import styles from '../company/CompanyProfileForm.module.css';

const CandidateApplications = () => {
  const { applications, loading, length, error } = useSelector(
    (state) => state.applicationList
  );

  const [page, setPage] = useState(1);
  const pageSize = 15;

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listApplications({ page: page }));
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR });
    };
  }, [page]);

  return (
    <UserPanelLayout>
      <div>
        <h2 className={styles['profile-h2']}>Wysłane aplikacje</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : applications.length === 0 ? (
          <Message variant='primary'>Brak aplikacji</Message>
        ) : (
          <div className='container'>
            <div
              className={`shadow pd-2 rounded-pill m-2 my-3 ${styles['my_bg']}`}
            >
              <Row className='d-flex align-items-center justify-content-around col-lg-12'>
                <Col lg={2} />
                <Col lg={1}>
                  <h4 className={styles['profile-h4']}>Firma</h4>
                </Col>
                <Col lg={3}>
                  <h4 className={styles['profile-h4']}>Stanowisko</h4>
                </Col>
                <Col lg={1}>
                  <h4 className={styles['profile-h4']}>Wysłano</h4>
                </Col>
                <Col lg={2}>
                  <h4 className={styles['profile-h4']}>Typ aplikowania</h4>
                </Col>
                <Col lg={2}>
                  <h4 className={styles['profile-h4']}>Status</h4>
                </Col>
                <Col></Col>
              </Row>
            </div>
            {applications.map((application, index) => (
              <ApplicationItem application={application} key={application.id} />
            ))}
            <div className={`d-flex mt-5 justify-content-center mx-5`}>
              <Pagination
                page={page}
                pageSize={pageSize}
                count={length}
                clickBack={handleClickBack}
                clickForward={handleClickForward}
              />
            </div>
          </div>
        )}
      </div>
    </UserPanelLayout>
  );
};
export default CandidateApplications;

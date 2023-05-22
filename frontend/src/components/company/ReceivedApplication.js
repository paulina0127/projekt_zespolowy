import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Modal } from 'react-bootstrap'
import ReceivedApplicationItem from './ReceivedApplicationItem'
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst'
import { listApplications } from '../../actions/applicationActions'
import { Loader, Message, MyModal, Pagination } from '../basics'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../company/CompanyProfileForm.module.css'
import styles2 from '../company/OfferForCompany.module.css'
import { BiArrowBack } from 'react-icons/bi'


const ReceivedApplication = ({ offer_id, show }) => {

  const { applications, loading, length, error } = useSelector(
    (state) => state.applicationList
  )
  const success = useSelector((state) => state.applicationChanges)

  const [page, setPage] = useState(1)
  const pageSize = 5

  const handleClickBack = () => setPage(page - 1)
  const handleClickForward = () => setPage(page + 1)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listApplications({ page: page, status: 'Złożona' }))
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR })
    }
  }, [dispatch, success, page])

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
      ) : applications.length === 0 ? (
        <Message variant='primary'>Brak aplikacji</Message>
      ) : (
        applications.map(application => (
          <ReceivedApplicationItem
            key={application.id}
            application={application}
            display={true}
          />
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
  )
}

export default ReceivedApplication

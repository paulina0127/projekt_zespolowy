import { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import ReceivedApplicationItem from './ReceivedApplicationItem'
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst'
import { listApplications, updateApplication } from '../../actions/applicationActions'
import { Loader, Message, MyModal } from '../basics'
import CompanyApplicationInfo from './CompanyApplicationInfo'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../company/CompanyProfileForm.module.css'
import styles2 from '../company/OfferForCompany.module.css'

const ReceivedApplication = () => {
  const [changeAppStatusIndex, setAppStatusIndex] = useState(null)
  const [statusType, setStatusType] = useState('')
  const { applications, loading, error } = useSelector(state => state.applicationList)
  const success = useSelector(state => state.applicationChanges)

  const dispatch = useDispatch()

  const handleShowModal = (index, type) => {
    setAppStatusIndex(index)
    setStatusType(type)
  }
  const handleCloseModal = () => {
    setAppStatusIndex(null)
  }

  const handleChageStatusApplication = (id, type) => {
    const value = { status: '' }
    if(type === 'accept') {
      value.status = 'Zaakceptowana'
    } else if (type === 'reject') {
      value.status = 'Odrzucona'
    }
    console.log(value)
    dispatch(updateApplication(id, value))
    setAppStatusIndex(null)
  }

  useEffect(() => {
    dispatch(listApplications())
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR })
    }
  }, [dispatch, success])
  
  return (
    <UserPanelLayout>
      <h2 className={styles['profile-h2']}>Otrzymane aplikacje</h2>
      <div className={`shadow pd-2 bg-warning rounded-pill m-2 my-3 ${styles2['container-app']}`}>
      <Row className='d-flex align-items-center justify-content-around col-lg-12'>
        <Col lg={2} />
        <Col lg={2}>
          <h4 className={styles['profile-h4']}>Imię i nazwisko</h4>
        </Col >
        <Col lg={1}>
          <h4 className={styles['profile-h4']}>Złożono</h4>
        </Col>
        <Col lg={2}>
          <h4 className={styles['profile-h4']}>Typ aplikowania</h4>
        </Col>
        <Col lg={2}>
          <h4 className={styles['profile-h4']}>Status</h4>
        </Col>
        <Col lg={3} />
      </Row>
    </div>
    { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : applications.length === 0 ? <Message variant='primary'>Brak aplikacji</Message>
      :
      applications
        .filter(application => application.status === "Złożona")
        .map((application, index) =>
      <Fragment key={application.id}>
        <ReceivedApplicationItem 
          application={application} 
          index={index}
          handleShowModal={handleShowModal}
        />
        {changeAppStatusIndex === index && (
          <MyModal
            showModal={true}
            title={statusType === 'accept' ? 'Akceptowanie aplikacji' : 'Odrzucanie aplikacji'}
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
      </Fragment>
      )
    }
    </UserPanelLayout>
  )
}
export default ReceivedApplication

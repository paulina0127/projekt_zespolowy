import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import ReceivedApplicationItem from './ReceivedApplicationItem'
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst'
import { listApplications } from '../../actions/applicationActions'
import { Loader, Message } from '../basics'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../company/CompanyProfileForm.module.css'
import styles2 from '../company/OfferForCompany.module.css'

const StoreApplication = () => {
  const { applications, loading, error } = useSelector(state => state.applicationList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listApplications())
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR })
    }
  }, [])

  const header = () => (
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
        <Col lg={5} />
      </Row>
    </div>
  )

  return (
    <UserPanelLayout>
      <h2 className={styles['profile-h2']}>Zaakceptowane aplikacje</h2>
      {header()}
    { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : applications.length === 0 ? <Message variant='primary'>Brak aplikacji</Message>
      :
      applications
        .filter(application => application.status === "Zaakceptowana")
        .map((application, index) =>
        <ReceivedApplicationItem 
          application={application} 
          key={application.id}
          index={index}
          old={true}
        />
      )
    }
    <h2 className={styles['profile-h2']}>Odrzucone aplikacje</h2>
    {header()}
    { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : applications.length === 0 ? <Message variant='primary'>Brak aplikacji</Message>
      : applications
        .filter(application => application.status === "Odrzucona")
        .map((application, index) =>
        <ReceivedApplicationItem 
          application={application} 
          key={application.id}
          index={index}
          old={true}
        />
        )
    }
    </UserPanelLayout>
  )
}

export default StoreApplication
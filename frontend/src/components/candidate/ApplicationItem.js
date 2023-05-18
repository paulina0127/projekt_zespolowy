import { Col, Row } from 'react-bootstrap'
import { FaCheck, FaTimes, FaHourglassStart } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import styles from '../company/CompanyProfileForm.module.css'

const ApplicationItem = ({application}) => {
  return (
    <div className='shadow pd-2 bg-white rounded-pill m-2 my-3'>
      <Row className='d-flex align-items-center justify-content-around col-lg-12'>
        <Col lg={2}>
          <img
            src={application.offer.company.image}
            alt='profile logo'
            className={styles['img-app']}
            />
        </Col>
        <Col lg={2}>
          <h4 className={styles['profile-h4']}>{application.offer.company.name}</h4>
        </Col >
        <Col lg={3}>
          <h4 className={styles['profile-h4']}>{application.offer.position}</h4>
        </Col>
        <Col lg={1}>
          <h4 className={styles['profile-h4']}>{application.created_date.slice(0, 10)}</h4>
        </Col>
        <Col lg={2}>
          <h4 className={styles['profile-h4']}>
            {application.status + ' '} 
            {application.status === "Złożona" ? <FaHourglassStart color='var(--dark-yellow)'/> 
            : application.status === "Zaakceptowana" ? <FaCheck color='#00BE75'/>
            : application.status === "Odrzucona" ? <FaTimes color='#DA4753'/> 
            : ''}
          </h4>
        </Col>
        {/* <Col>
          <button type='submit' className={styles['yellow-btn']}>
            Wyświetl
          </button>
        </Col> */}
        <Col lg={1}>
          {/* FaCheck, FaTimes, FaHourglassStart w zależności od statusu aplikacji*/}
          <span>
            <MdDelete color='#DA4753' size='2rem'/>
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default ApplicationItem
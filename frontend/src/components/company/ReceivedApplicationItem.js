import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { HiSearch } from 'react-icons/hi'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import styles from '../company/CompanyProfileForm.module.css'
import styles2 from '../company/OfferForCompany.module.css'

const ReceivedApplicationItem = ({ application, index, handleShowModal, old }) => {
  return (
    <div className={`shadow bg-white rounded-pill m-2 my-3 ${styles2['container-app']}`}>
      <Row className='d-flex align-items-center col-lg-12'>
        <Col lg={2}>
          <img
            src={application.candidate.image}
            alt='profile logo'
            className={styles['img-candidate']}
          />
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>
            {application.candidate.first_name + ' ' + application.candidate.last_name}
          </h6>
        </Col >
        <Col lg={1}>
          <h6 className={styles['profile-h4']}>{application.created_date.slice(0, 10)}</h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>{application.type}</h6>
        </Col>
        {old ? '' :
        <>
          <Col lg={2}>
            <h6 className={styles['profile-h4']}>{application.status}</h6>
          </Col>
          <Col lg={3}>
            <ul className={styles2['offer-btn']}>
              <Link to={`/`}>
                <button
                  type='button'
                  title='Szczegóły aplikacji'
                  className={`btn btn-secondary rounded-circle mx-1 mt-3 ${styles2.circleBtn}`}
                >
                  <HiSearch />
                </button>
              </Link>
              <button
                type='button'
                title='Akceptuj aplikację'
                className={`btn btn-success rounded-circle mx-1 mt-3 ${styles2.circleBtn}`}
                onClick={() => handleShowModal(index, 'accept')}
              >
                <AiOutlineCheck />
              </button>
              <button
                type='button'
                title='Odrzuć aplikację'
                className={`btn btn-danger rounded-circle mx-1 mt-3 ${styles2.circleBtn}`}
                onClick={() => handleShowModal(index, 'reject')}
              >
                <AiOutlineClose />
              </button>
            </ul>
          </Col> 
        </>
        }
      </Row>
    </div>
  )
}

export default ReceivedApplicationItem
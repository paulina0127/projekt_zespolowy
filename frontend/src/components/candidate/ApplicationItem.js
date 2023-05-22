import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { FaCheck, FaTimes, FaHourglassStart } from 'react-icons/fa';
import styles from '../company/CompanyProfileForm.module.css';
import { HiSearch } from 'react-icons/hi';

const ApplicationItem = ({ application }) => {
  return (
    <div className='shadow pd-2 bg-white rounded-pill m-2 my-3'>
      <Row className='d-flex align-items-center col-lg-12'>
        <Col lg={2}>
          <Link to={`/pracodawca/${application.offer.company.id}`}>
            <img
              src={application.offer.company.image}
              alt='profile logo'
              className={styles['img-app']}
            />
          </Link>
        </Col>
        <Col lg={1}>
          <Link to={`/pracodawca/${application.offer.company.id}`}>
            <h6 className={styles['profile-h4']}>
              {application.offer.company.name}
            </h6>
          </Link>
        </Col>
        <Col lg={3}>
          <Link to={`/oferta/${application.offer.id}`}>
            <h6 className={styles['profile-h4']}>
              {application.offer.position}
            </h6>
          </Link>
        </Col>
        <Col lg={1}>
          <h6 className={styles['profile-h4']}>
            {application.created_date.slice(0, 10)}
          </h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>{application.type}</h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>{application.status + ' '}</h6>
        </Col>
        <Col>
          <Link
            to={`/user-panel/moje-aplikacje/${application.id}`}
            target='_blank'
          >
            <button
              type='button'
              title='Szczegóły'
              className={`btn btn-secondary rounded-circle mx-1 ${styles.circleBtn}`}
            >
              <HiSearch />
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationItem;

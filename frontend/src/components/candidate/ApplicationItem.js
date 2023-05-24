import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import styles from '../company/CompanyProfileForm.module.css';
import placeholder from '../../images/placeholder.png';

const ApplicationItem = ({ application }) => {
  return (
    <div className='shadow pd-2 bg-white rounded-pill m-2 my-3'>
      <Row className='d-flex align-items-center col-lg-12'>
        <Col lg={2}>
          <Link to={`/pracodawca/${application.offer.company.id}`}>
            <img
              src={
                application.offer.company.image
                  ? application.offer.company.image
                  : placeholder
              }
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
          <h6 className={styles['profile-h4']}>{application.status}</h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>{application.type}</h6>
        </Col>
        <Col lg={1}>
          <h6 className={styles['profile-h4']}>
            {application.created_date.slice(0, 10)}
          </h6>
        </Col>
        <Col lg={2}>
          {application.attachments
            ? application.attachments.map((att) => (
                <Link to={att.file.path} key={att.id} target='_blank'>
                  <h6 className={styles['profile-h4']}>{att.file.name}</h6>
                </Link>
              ))
            : ''}
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationItem;

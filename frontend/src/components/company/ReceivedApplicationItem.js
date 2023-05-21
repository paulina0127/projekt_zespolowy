import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { HiSearch } from 'react-icons/hi';
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import styles from '../company/CompanyProfileForm.module.css';
import styles2 from '../company/OfferForCompany.module.css';

const ReceivedApplicationItem = ({
  application,
  index,
  handleShowModal,
  handleShowEditModal,
  handleShowCandidateModal,
  old,
}) => {
  return (
    <div
      className={`shadow bg-white rounded-pill mx-5 my-3 px-5 ${styles2['container-app']}`}
    >
      <Row className='d-flex align-items-center col-lg-12'>
        <Col
          lg={3}
          className='d-grid align-items-center justify-content-center gap-3'
          style={{
            gridTemplateColumns: 'min-content max-content',
            cursor: 'pointer',
          }}
          onClick={!old ? () => handleShowCandidateModal(index) : null}
        >
          <img
            src={application.candidate.image}
            alt='profile logo'
            className={styles['img-candidate']}
          />
          <h6 className={styles['profile-h4']}>
            {application.candidate.first_name +
              ' ' +
              application.candidate.last_name}
          </h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>{application.offer.position}</h6>
        </Col>
        <Col lg={2}>
          <h6 className={styles['profile-h4']}>
            {application.created_date.slice(0, 10)}
          </h6>
        </Col>
        {old ? (
          <Col lg={3}>
            <ul className={styles2['offer-btn']}>
              <Link to={`/user-panel/aplikacje-archiwum/${application.id}`}>
              <button
                type='button'
                title='Szczegóły aplikacji'
                className='btn btn-secondary rounded-pill mx-1 mt-3'
              >
                Szczegóły
              </button>
              </Link>
            </ul>
          </Col>
        ) : (
          <>
            <Col lg={2}>
              <h6 className={styles['profile-h4']}>{application.status}</h6>
            </Col>
            <Col lg={3}>
              <ul className={styles2['offer-btn']}>
                <Link to={`/user-panel/aplikacje/${application.id}`}>
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
                <button
                  type='button'
                  title='Notatki'
                  className={`btn btn-primary rounded-circle mx-1 mt-3 ${styles2.circleBtn}`}
                  onClick={() => handleShowEditModal(index)}
                >
                  <AiOutlineEdit />
                </button>
              </ul>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ReceivedApplicationItem;

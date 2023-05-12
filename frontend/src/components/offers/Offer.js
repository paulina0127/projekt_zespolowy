import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Offer.module.css'
import { NewApplication } from '../candidate'

const Offer = ({ offer }) => {
  const [showModal, setShowModal] = useState(false)

  const handleApplyClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <li className={styles['job-card']}>
      <div className={styles['job-card__info']}>
        <div className='d-md-flex align-items-center'>
          <Link to={`/companies/${offer.company.id}`}>
            <img
              src={offer.company.image}
              alt='Company pic'
              className={styles['img-c']}
            />
          </Link>
          <div>
            <div className='d-flex align-items-center'>
              <p>{offer.company.name}</p>
            </div>
            <Link to={`/oferta/${offer.id}`} style={{ textDecoration: 'none' }}>
              <h6>{offer.position}</h6>
            </Link>
            <ul>
              <li>{offer.position_level}</li>
              <li>Wygasa: {offer.expiration_date.slice(0, 10)}</li>
              <li>{offer.location.city}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul className={styles['offer-btn']}>
        <Link to={`/oferta/${offer.id}`}>
          <button className='btn mx-2'>Szczegóły</button>
        </Link>
        <button
          className='btn'
          onClick={handleApplyClick}
          style={{ backgroundColor: 'var(--yellow)' }}
        >
          Aplikuj
        </button>
      </ul>
      {showModal && (
        <NewApplication
          offer={offer}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </li>
  )
}

export default Offer

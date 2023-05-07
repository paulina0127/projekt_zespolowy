import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { deleteOffer } from '../actions/offerActions'
import { HiOutlineTrash, HiSearch } from 'react-icons/hi'
import { BiEditAlt } from 'react-icons/bi'
import styles from './Offer.module.css'
import styles2 from './OfferForCompany.module.css'


const OfferForCompany = ({offer}) => {
  const [delOffer, setDelOffer] = useState(false)

  const dispatch = useDispatch()

  const handleDeleteOffer = () => {
    dispatch(deleteOffer(offer.id))
    setDelOffer(false)
  }
  return (
    <>
      <Modal
      show={delOffer}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      >
      <Modal.Header className='bg-danger text-light'>
        <Modal.Title id='contained-modal-title-vcenter'>
          Czy na pewno chcesz usunąć tę ofertę?  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Usunięcie oferty jest nieodwracalne</h5>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant='secondary' onClick={() => setDelOffer(false)}>Powrót</Button>
        <Button variant='danger' onClick={handleDeleteOffer}>Usuń ofertę <HiOutlineTrash/></Button>
      </Modal.Footer>
      </Modal>
      <li className={styles['job-card']}>
        <div className={styles['job-card__info']}>
          <div className='d-md-flex align-items-center'>
            <div className={styles['img-c']}><img src='http://projects.lollypop.design/job-listing/photosnap.svg' alt='company pic'/></div>
            <div>
              <div className='d-flex align-items-center'>
                <p>{offer.position_level}</p>
              </div>
                <Link to={`/oferta/${offer.id}`} style={{textDecoration: 'none'}}>
                  <h6>{offer.position}</h6>
                </Link>
              <ul>
                <li>Dodano: {offer.created_date.slice(0, 10)}</li>
                <li>Wygasa: {offer.expiration_date.slice(0, 10)}</li>
              </ul>
            </div>
          </div>
        </div>
        <ul className={styles2['offer-btn']}>
          <Link to={`/`}>
            <button className={`btn mx-2 ${styles2.applyBtn}`}>Aplikacje</button>
          </Link>
          <Link to={`/oferta/${offer.id}`}>
            <button type='button' className={`btn btn-secondary rounded-circle mx-1 ${styles2.circleBtn}`}>
              <HiSearch />
            </button>
          </Link>
          <button type='button' className={`btn btn-success rounded-circle mx-1 ${styles2.circleBtn}`}>
            <BiEditAlt />
          </button>
          <button 
            type='button' 
            className={`btn btn-danger rounded-circle mx-1 ${styles2.circleBtn}`}
            onClick={() => setDelOffer(true)}
          >
            <HiOutlineTrash />
          </button>
        </ul>
      </li>
    </>
  )
}

export default OfferForCompany
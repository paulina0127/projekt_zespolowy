import { useEffect } from 'react'
import { useDispatch, connect, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { USER_DETAILS_PROFILE_RESET } from '../constants/userConst'
import Message from './Message'
import Loader from './Loader'
import { Modal, Button, Row, Col } from 'react-bootstrap'

import styles from './NewApplication.module.css'
import { useState } from 'react'
import ApplicationForm from './ApplicationForm'

const NewApplication = ({ offer, isAuthenticated, getCandidateFiles, showModal, handleCloseModal }) => {
  const [applyMethod, setApplyMethod] = useState('Profil kandydata')

  const handleMethodChange = (e) => {
    const target = e.target
    if (target.checked) {
      setApplyMethod(target.value)
    }
  }

  const profile = useSelector((state) => state.auth.user.profile);
  const profileDetails = useSelector((state) => state.userProfileDetails);
  const { user, experienceList, filesList, loading } = profileDetails;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserDetails(profile, 'Kandydat'))
    // return () => {
    //   dispatch({ type: USER_DETAILS_PROFILE_RESET })
    // }
  }, [])

  const initialValues = {
    offer: offer.id,
    type: applyMethod,
    attachments: []
  }

  if (!isAuthenticated) {
    return <Message variant='info'>Zaloguj się, aby móc aplikować</Message>;
  }

  return (
    <Modal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-warning'>
        <Modal.Title>
          Potwierdzenie aplikacji na stanowisko 
          <h3><strong>{offer.position}</strong></h3>
          <div className={`mt-3 ${styles['radio_container']}`}>
            <input onChange={handleMethodChange} type="radio" name="applyMethod" id='profile' value='Profil kandydata' checked={applyMethod === 'Profil kandydata'}/>
            <label htmlFor="profile">Aplikuję profilem kandydata</label>
            <input onChange={handleMethodChange} type="radio" name="applyMethod" id='cv' value='CV' checked={applyMethod === 'CV'}/> 
            <label htmlFor="cv">Aplikuję CV</label>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { loading ? (
          <Loader />
        ) : user && user.location && filesList ? (
          <div className='col col-4'>
            <h4 className='border-bottom my-3'>Twoje dane osobowe</h4>
            <h6>Imię: {user.first_name}</h6>
            <h6>Nazwisko: {user.last_name}</h6>
            <h6>Telefon: {user.phone_number}</h6>
            <h6>PESEL: {user.pesel}</h6>
            <h6>Ulica (nazwa i numer): {user.location.street_address}</h6>
            <h6>Kod pocztowy: {user.location.postal_code}</h6> 
            <h6>Miasto: {user.location.city}</h6>
            <ApplicationForm initialValues={initialValues} filesList={filesList}/>
          </div> 
        ) : ''}
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button onClick={handleCloseModal} variant='outline-warning'>Anuluj</Button>
      </Modal.Footer> 
    </Modal>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getUserDetails })(NewApplication);

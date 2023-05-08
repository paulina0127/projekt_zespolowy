import { Formik, Form } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserProfile, updateUserProfile } from '../actions/userActions'
import {
  USER_UPDATE_PROFILE_RESET,
  USER_CREATE_PROFILE_RESET,
} from '../constants/userConst'
import { TextField } from './TextField'
import Message from './Message'
import Loader from './Loader'
import styles from './ComapnyProfileForm.module.css'
import { FaPlus } from 'react-icons/fa'
import placeholder from '../images/avatar.png'

const CandidateProfileForm = ({ initialValues, validate, label, profileExist, userProfile }) => {
  const dispatch = useDispatch();

  const updateProfile = useSelector((state) => state.userUpdateProfile)
  const { error, success, loading } = updateProfile

  const createProfile = useSelector((state) => state.userCreateProfile)
  const { errorCreate, successCreate, loadingCreate } = createProfile  
  return (
    <div>
      <h2 className={styles['profile-h2']}>Dane osobowe</h2>
      {loading && <Loader />}
      {loadingCreate && <Loader />}
      {success && (
        <Message variant='success'>Pomyślnie zapisano zmiany</Message>
      )}
      {successCreate && (
        <Message variant='success'>
          Pomyślnie utworzono profil kandydata
        </Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {errorCreate && <Message variant='danger'>{error}</Message>}
      <div className={styles['white-bg']}>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            if (profileExist) {
              const updatedValues = {};
              for (const key in values) {
                if (values[key] !== initialValues[key]) {
                  updatedValues[key] = values[key];
                }
              }
              dispatch(updateUserProfile(userProfile, 'Kandydat', updatedValues))
            } else {
              dispatch(createUserProfile('Kandydat', values))
            }
          }}
        >
          {({ values }) => (
          <Form>
            <div className='container p-5'>
              <div className='d-flex row justify-content-around '>
                <div className='col col-4 align-self-center text-center'>
                  <div className='row'>
                    <div className={styles['avatar-title']}>Avatar</div>
                  </div>
                  <div className='row top-50'>
                    <button className={styles['avatar-btn']}>
                      <FaPlus size='2.5em' color='#242424' />
                    </button>
                  </div>
                  <div className='row'>
                    <Image
                      style={{ width: '300px', margin: '20px auto' }}
                      src={placeholder}
                      alt='User pic'
                      roundedCircle
                    />
                  </div>
                </div>
                <div className='col col-4'>
                  <h4 className={styles['profile-h4']}>Imię</h4>
                  <TextField name='first_name' type='text' />
                  <h4 className={styles['profile-h4']}>Nazwisko</h4>
                  <TextField name='last_name' type='text' />
                  <h4 className={styles['profile-h4']}>Telefon</h4>
                  <TextField name='phone_number' type='text' />
                  <h4 className={styles['profile-h4']}>PESEL</h4>
                  <TextField name='pesel' type='text' />
                  <h4 className={styles['profile-h4']}>Ulica (nazwa i numer)</h4>
                  <TextField name='location.street_address' type='text'/>
                  <h4 className={styles['profile-h4']}>Kod pocztowy</h4>
                  <TextField name='location.postal_code' type='text'/>
                  <h4 className={styles['profile-h4']}>Miasto</h4>
                  <TextField name='location.city' type='text'/>
                </div>
              </div>
            </div>
            <div className='d-grid col-2 mx-auto'>
              <button
                type='submit'
                className='btn btn-warning rounded-pill fw-bold shadow-sm '
              >
                {label}
              </button>
            </div>
          </Form>
        )}
        </Formik>
      </div>
    </div>
  )
}

export default CandidateProfileForm

import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { createUserProfile, updateUserProfile } from '../../actions/userActions'
import {
  USER_CREATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_RESET,
} from '../../constants/userConst'
import { Loader, Message } from '../basics'
import { TextArea, TextField, FileField } from '../formHelpers'
import styles from './CompanyProfileForm.module.css'

const ComapnyProfileForm = ({
  initialValues,
  validate,
  label,
  profileExist,
  userProfile,
}) => {
  const dispatch = useDispatch()

  const updateProfile = useSelector((state) => state.userUpdateProfile)
  const { error, success, loading } = updateProfile

  const createProfile = useSelector((state) => state.userCreateProfile)
  const { errorCreate, successCreate, loadingCreate } = createProfile

  useEffect(() => {
    return () => {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch({ type: USER_CREATE_PROFILE_RESET })
    }
  }, [])

  return (
    <div className='container justify-content-center px-4 py-5 my-3'>
      <h2 className={styles['profile-h2']}>Profil pracodawcy</h2>
      {loading && <Loader />}
      {loadingCreate && <Loader />}
      {success && (
        <Message variant='success'>Pomyślnie zapisano zmiany</Message>
      )}
      {successCreate && (
        <Message variant='success'>
          Pomyślnie utworzono profil pracodawcy
        </Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          if (profileExist) {
            dispatch(updateUserProfile(userProfile, 'Pracodawca', values))
          } else {
            dispatch(createUserProfile('Pracodawca', values))
          }
        }}
      >
        {({ values }) => (
          <Form encType='multipart/form-data'>
            <div className='shadow p-3 bg-white rounded-5'>
              <div className='container'>
                <div className='d-flex row justify-content-around'>
                  <div className='col'>
                    <div className='row mt-4'>
                      <div className='col-md-4'>
                        <TextField
                          label='Nazwa firmy'
                          name='name'
                          type='text'
                        />
                      </div>
                      <div className='col-md-4'>
                        <TextField label='NIP firmy' name='nip' type='text' />
                      </div>
                    </div>

                    <div className='row mt-4'>
                      <div className='col-md-3'>
                        <TextField
                          label='Ulica (nazwa i numer)'
                          name='location.street_address'
                          type='text'
                        />
                      </div>
                      <div className='col-md-2'>
                        <TextField
                          label='Kod pocztowy'
                          name='location.postal_code'
                          type='text'
                        />
                      </div>
                      <div className='col-md-3'>
                        <TextField
                          label='Miasto'
                          name='location.city'
                          type='text'
                        />
                      </div>
                    </div>

                    <div className='row mt-4'>
                      <div className='col-md-3'>
                        <TextField
                          label='Numer kontaktowy'
                          name='phone_number'
                          type='text'
                        />
                      </div>
                      <div className='col-md-3'>
                        <TextField
                          label='Strona internetowa'
                          name='website'
                          type='text'
                        />
                      </div>
                      <div className='col-md-5'>
                        <TextField
                          label='Kontaktowy adres e-mail'
                          name='email'
                          type='text'
                        />
                      </div>
                    </div>

                    <div className='row mt-4'>
                      <div className='col-md-8'>
                        <TextArea
                          label='Opis firmy'
                          name='description'
                          as='textarea'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='d-grid col col-4 align-self-center justify-items-center text-center'>
                    <div className={styles['avatar-title']}>Logo</div>
                    <div className={styles.avatarContainer}>
                      <img
                        src={
                          values?.image !== initialValues?.image &&
                          values?.image instanceof File
                            ? URL.createObjectURL(values?.image)
                            : initialValues?.image
                        }
                        style={{
                          objectFit: 'cover',
                          borderRadius: '50%',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <label htmlFor='image'>
                        <div className={styles.avatarBtn}>
                          <FaPlus color='#fff' className={styles.avatarIcon} />
                        </div>
                      </label>
                      <FileField
                        name='image'
                        type='file'
                        accept='image/png, image/jpeg'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-grid col-3 mx-auto mt-4'>
                <button type='submit' className={styles['yellow-btn']}>
                  {label}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ComapnyProfileForm

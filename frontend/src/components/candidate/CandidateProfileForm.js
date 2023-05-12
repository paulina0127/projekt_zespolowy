import { Form, Formik } from 'formik'
import { Image } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { createUserProfile, updateUserProfile } from '../../actions/userActions'
import { Loader, Message } from '../basics'
import styles from '../company/CompanyProfileForm.module.css'
import { TextField } from '../formHelpers'

const CandidateProfileForm = ({
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
      <div className='shadow p-3 bg-white rounded-5 m-5'>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            if (profileExist) {
              const updatedValues = {}
              for (const key in values) {
                if (values[key] !== initialValues[key]) {
                  updatedValues[key] = values[key]
                }
              }
              dispatch(
                updateUserProfile(userProfile, 'Kandydat', updatedValues)
              )
            } else {
              dispatch(createUserProfile('Kandydat', values))
            }
          }}
        >
          {({ values }) => (
            <Form>
              <div className='container p-3 text-center'>
                <div className='d-flex row justify-content-around '>
                  <div className='col col-4'>
                    <div className='row mt-5'>
                      <div className={styles['avatar-title']}>Zdjęcie</div>
                    </div>
                    <div className='row top-50'>
                      <button className={styles['avatar-btn']}>
                        <FaPlus size='2.5em' color='#242424' />
                      </button>
                    </div>
                    <div className='row'>
                      <Image
                        style={{
                          height: '300px',
                          width: '300px',
                          margin: '20px auto',
                          objectFit: 'cover',
                        }}
                        src={initialValues.image}
                        alt='User pic'
                        roundedCircle
                      />
                    </div>
                  </div>
                  <div className='col'>
                    <div className='row mt-4 justify-content-end'>
                      <div className='col col-md-5'>
                        <TextField label='Imię' name='first_name' type='text' />
                      </div>

                      <div className='col col-md-5'>
                        <TextField
                          label='Nazwisko'
                          name='last_name'
                          type='text'
                        />
                      </div>
                    </div>
                    <div className='row mt-4 justify-content-end'>
                      <div className='col col-md-5'>
                        <TextField
                          label='Ulica (nazwa i numer)'
                          name='location.street_address'
                          type='text'
                        />
                      </div>

                      <div className='col col-md-2'>
                        <TextField
                          label='Kod pocztowy'
                          name='location.postal_code'
                          type='text'
                        />
                      </div>

                      <div className='col col-md-4'>
                        <TextField
                          label='Miasto'
                          name='location.city'
                          type='text'
                        />
                      </div>
                    </div>
                    <div className='row mt-4 justify-content-end'>
                      <div className='col col-md-4'>
                        <TextField label='PESEL' name='pesel' type='text' />
                      </div>
                      <div className='col col-md-4'>
                        <TextField
                          label='Telefon'
                          name='phone_number'
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-grid col-2 mx-auto'>
                <button type='submit' className={styles['yellow-btn']}>
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

import { Formik, Form } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUserProfile, updateUserProfile } from '../actions/userActions'
import { TextField } from './TextField'
import { TextArea } from './TextArea'
import { USER_UPDATE_PROFILE_RESET, USER_CREATE_PROFILE_RESET } from '../constants/userConst'
import Message from './Message'
import Loader from './Loader'

const ComapnyProfileForm = ({initialValues, validate, label, profileExist, userProfile}) => {
  const dispatch = useDispatch()

  const updateProfile = useSelector(state => state.userUpdateProfile)
  const { error, success, loading } = updateProfile

  const createProfile = useSelector(state => state.userCreateProfile)
  const { errorCreate, successCreate, loadingCreate } = createProfile

  useEffect(() => {
    return () => {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch({ type: USER_CREATE_PROFILE_RESET })
    }
  }, [])

  return (
    <div className='container justify-content-center px-4 py-5 my-3'>
      <h1 className='mt-2 mb-5'>Profil pracodawcy: </h1>
      { loading && <Loader /> }
      { loadingCreate && <Loader /> }
      { success && <Message variant='success'>Pomyślnie zapisano zmiany</Message>}
      { successCreate && <Message variant='success'>Pomyślnie utworzono profil pracodawcy</Message>}
      { error && <Message variant='danger'>{error}</Message>}
      { errorCreate && <Message variant='danger'>{error}</Message>}
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={values => {
          if(profileExist) {
            dispatch(updateUserProfile(userProfile, 'Pracodawca', values))
          } else {
            dispatch(createUserProfile('Pracodawca', values))
          }
        }}
      >
      {({ values }) => (
      <Form>
        <div className='row mt-4'>
          <div className='col-md-4'>
            <TextField label='Nazwa firmy' name='name' type='text' />
          </div>
          <div className='col-md-4'>
            <TextField label='NIP firmy' name='nip' type='text' />
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-3'>
            <TextField label='Ulica (nazwa i numer)' name='location.street_address' type='text' />
          </div>
          <div className='col-md-2'>
            <TextField label='Kod pocztowy' name='location.postal_code' type='text' />
          </div>
          <div className='col-md-3'>
            <TextField label='Miasto' name='location.city' type='text' />
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-3'>
            <TextField label='Numer kontaktowy' name='phone_number' type='text' />
          </div>
          <div className='col-md-3'>
            <TextField label='Strona internetowa' name='website' type='text' />
          </div>
          <div className='col-md-3'>
            <TextField label='Kontaktowy adres e-mail' name='email' type='text' />
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-7'>
            <TextArea label='Opis firmy' name='description' as='textarea' />
          </div>
        </div>
        <button
            type='submit'
            className='btn btn-warning btn-block text-uppercase my-3 rounded-pill shadow-sm w-100'
        >
          {label}
        </button>
        
      </Form>
      )}
      </Formik>
    </div>
  )
}

export default ComapnyProfileForm
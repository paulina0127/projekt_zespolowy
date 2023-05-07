import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { USER_DETAILS_PROFILE_RESET } from '../constants/userConst'
import { validateCandidateProfile } from '../validators/validators'
import CandidateProfileForm from './CandidateProfileForm'
import Loader from './Loader'
import Message from './Message'

const CandidateProfileUpdate = ({ userProfile }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserDetails(userProfile, 'Kandydat'))
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET })
    }
  }, [])

  const profile = useSelector((state) => state.userProfileDetails)
  const { error, loading, user } = profile

  const initialValues = user
    ? {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        pesel: user.pesel,
        image: user.image,
      }
    : {}

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : user && Object.keys(user).length === 0 ? null : (
        <CandidateProfileForm
          profileExist={true}
          userProfile={userProfile}
          initialValues={initialValues}
          label='Zapisz zmiany'
        />
      )}
    </>
  )
}

export default CandidateProfileUpdate

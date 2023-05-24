import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import { validateCandidatePersonalInfo } from '../../validators/validators'
import { Loader, Message } from '../basics'
import CandidateProfileForm from './CandidateProfileForm'

const CandidateProfileUpdate = ({ userProfile }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserDetails(userProfile, 'Kandydat'))
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET })
    }
  }, [dispatch])

  const profile = useSelector((state) => state.userProfileDetails)
  const { error, loading, user } = profile
 
  const personalInfo = user && user.location
    ? {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        location: {
          street_address: user.location.street_address,
          postal_code: user.location.postal_code,
          city: user.location.city
        },
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
          initialValues={personalInfo}
          validate={validateCandidatePersonalInfo}
          label='Zapisz zmiany'
        />
      )}
    </>
  )
}

export default CandidateProfileUpdate

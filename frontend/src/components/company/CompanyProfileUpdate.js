import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import { validateCompanyProfile } from '../../validators/validators'
import { Loader, Message } from '../basics'
import ComapnyProfileForm from './CompanyProfileForm'

const CompanyProfileUpdate = ({ userProfile }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserDetails(userProfile, 'Pracodawca'))
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET })
    }
  }, [])

  const profile = useSelector((state) => state.userProfileDetails)
  const { error, loading, user } = profile

  const initialValues =
    user && user.location
      ? {
          nip: user.nip,
          name: user.name,
          phone_number: user.phone_number,
          email: user.email,
          location: {
            street_address: user.location.street_address,
            postal_code: user.location.postal_code,
            city: user.location.city,
          },
          website: user.website,
          description: user.description,
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
        <ComapnyProfileForm
          profileExist={true}
          userProfile={userProfile}
          initialValues={initialValues}
          validate={validateCompanyProfile}
          label='Zapisz zmiany'
        />
      )}
    </>
  )
}

export default CompanyProfileUpdate

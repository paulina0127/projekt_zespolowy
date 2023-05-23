import CandidateProfileForm from './CandidateProfileForm'
import { validateCandidatePersonalInfo } from '../../validators/validators'

const CandidateProfileCreate = () => {
  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    location: {
      street_address: '',
      postal_code: '',
      city: '',
    },
    pesel: '',
    image: null,
  }

  return (
    <CandidateProfileForm 
      initialValues={initialValues} 
      label='Załóż profil' 
      validate={validateCandidatePersonalInfo}
    />
  )
}

export default CandidateProfileCreate

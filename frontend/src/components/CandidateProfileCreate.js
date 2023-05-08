import CandidateProfileForm from './CandidateProfileForm'
import { validateCompanyProfile } from '../validators/validators'

const CandidateProfileCreate = () => {
  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    location: {
      street_address: '',
      postal_code: '',
      city: ''
    },
    pesel: '',
    image: '',
  }

  return (
    <CandidateProfileForm initialValues={initialValues} label='Załóż profil' />
  )
}

export default CandidateProfileCreate

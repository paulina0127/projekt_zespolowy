import CandidateProfileForm from './CandidateProfileForm'
import { validateCompanyProfile } from '../validators/validators'

const CandidateProfileCreate = () => {
  const initialValues = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    pesel: '',
    image: '',
  }

  return (
    <CandidateProfileForm initialValues={initialValues} label='Załóż profil' />
  )
}

export default CandidateProfileCreate

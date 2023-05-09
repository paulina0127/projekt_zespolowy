import { validateCompanyProfile } from '../validators/validators';
import ComapnyProfileForm from './CompanyProfileForm';

const CompanyProfileCreate = () => {
  const initialValues = {
    nip: '',
    name: '',
    phone_number: '',
    email: '',
    location: {
      street_address: '',
      postal_code: '',
      city: '',
    },
    website: '',
    description: '',
    image: '',
  };

  return (
    <ComapnyProfileForm
      initialValues={initialValues}
      validate={validateCompanyProfile}
      label='Załóż profil'
    />
  );
};

export default CompanyProfileCreate;

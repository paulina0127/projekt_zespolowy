import CandidateProfileForm from './CandidateProfileForm';

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
  };

  return (
    <CandidateProfileForm initialValues={initialValues} label='Załóż profil' />
  );
};

export default CandidateProfileCreate;

import { connect, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import { reset_password } from "../../actions/authActions"

import { TextField } from '../../components/TextField';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/resetpass.jpg';

const ResetPassword = ({ reset_password }) => {

  const validate = object({
    email: string()
      .email('To nie jest prawidłowy adres email')
      .required('Pole adres email jest obowiązkowe'),
  });

  const auth = useSelector(state => state.auth);
  const { error, loading, success } = auth;

  return (
    <LayoutAuth bgImage={Background}>
      <h3 className="display-4">Przypomnij hasło</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {success && <Message variant='success'>Email z linkiem do zmiany hasła został wysłany.</Message>}
      <p className="text-muted mb-4">
        Podaj nam swój e-mail.
        Wyślemy Ci link do zmiany hasła.
      </p>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validate}
        onSubmit={(values, {resetForm}) => {
          const { email } = values;
          reset_password(email);
          resetForm({ values: ''});
        }}
      >
      {({ values }) => (
        <Form>
          <TextField label="Email" name="email" type="email" />
          <button 
            className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100" 
            type='submit'>
            Wyślij
          </button>
        </Form>
      )}  
      </Formik>
      {/* <p className='mt-3'>
        Masz już konto? <Link className='text-decoration-none' to='/logowanie'>Zaloguj się</Link>
      </p> */}
    </LayoutAuth>
  );
};

export default connect(null, { reset_password })(ResetPassword);
import { connect, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { validateResetPassword } from '../../validators/validators'
import { reset_password } from '../../actions/authActions'

import { TextField } from '../../components/formHelpers'
import { Loader, Message } from '../../components/basics'
import LayoutAuth from '../../hocs/LayoutAuth'
import Background from '../../images/resetpass.jpg'
import styles from '../../components/company/CompanyProfileForm.module.css'

const ResetPassword = ({ reset_password }) => {

  const auth = useSelector((state) => state.auth)
  const { error, loading, success } = auth

  return (
    <LayoutAuth bgImage={Background}>
      <h3 className='display-4'>Przypomnij hasło</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {success && (
        <Message variant='success'>
          Email z linkiem do zmiany hasła został wysłany.
        </Message>
      )}
      <p className='text-muted mb-4'>
        Podaj nam swój e-mail. Wyślemy Ci link do zmiany hasła.
      </p>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validateResetPassword}
        onSubmit={(values, { resetForm }) => {
          const { email } = values
          reset_password(email)
          resetForm({ values: '' })
        }}
      >
        {({ values }) => (
          <Form>
            <TextField label='Email' name='email' type='email' />
            <button className={styles['yellow-blck-btn']} type='submit'>
              Wyślij
            </button>
          </Form>
        )}
      </Formik>
    </LayoutAuth>
  )
}

export default connect(null, { reset_password })(ResetPassword)

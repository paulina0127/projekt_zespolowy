import { useParams, Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { reset_password_confirm } from '../../actions/authActions'
import { validateNewPassword } from '../../validators/validators'

import { Loader, Message } from '../../components/basics'
import { TextField } from '../../components/formHelpers'
import LayoutAuth from '../../hocs/LayoutAuth'
import Background from '../../images/resetpass.jpg'
import { VscCheckAll } from 'react-icons/vsc'
import styles from '../../components/company/CompanyProfileForm.module.css'

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const uid = useParams().uid
  const token = useParams().token

  const auth = useSelector((state) => state.auth)
  const { error, loading, success } = auth

  return (
    <LayoutAuth bgImage={Background}>
      <h3 className='display-4'>Podaj nowe hasło</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {success && (
        <Message variant='success'>
          Pomyślnie zmieniono hasło <VscCheckAll />
        </Message>
      )}
      <p className='text-muted mb-4'>
        Po zatwierdzeniu nowego hasła, użyj go do zalogowania się do swojego
        konta.
      </p>
      <Formik
        initialValues={{
          new_password: '',
          re_new_password: '',
        }}
        validationSchema={validateNewPassword}
        onSubmit={(values, { resetForm }) => {
          const { new_password, re_new_password } = values
          reset_password_confirm(uid, token, new_password, re_new_password)
          resetForm({ values: '' })
        }}
      >
        {({ values }) => (
          <Form>
            <TextField label='Hasło' name='new_password' type='password' />
            <TextField
              label='Potwierdź hasło'
              name='re_new_password'
              type='password'
            />
            <button className={styles['yellow-blck-btn']} type='submit'>
              Zmień hasło
            </button>
          </Form>
        )}
      </Formik>
      <p className='mt-3'>
        Hasło zostało zmienione?{' '}
        <Link className='text-decoration-none' to='/logowanie'>
          Zaloguj się
        </Link>
      </p>
    </LayoutAuth>
  )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)

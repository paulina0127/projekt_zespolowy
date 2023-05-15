import { Formik, Form } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { change_email } from '../../actions/authActions'
import { TextField } from '../formHelpers'
import { validateChangeEmail } from '../../validators/validators'
import styles from '../company/CompanyProfileForm.module.css'

const ChangeEmailForm = () => {
  const dispatch = useDispatch()

  const initialValues = {
    new_email: '', 
    re_new_email: '',
    current_password: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangeEmail}
      onSubmit={(values, { resetForm }) => {
        const { new_email, re_new_email, current_password } = values
        dispatch(change_email(new_email, re_new_email, current_password))
        resetForm({ values: '' })
      }}
    >
      {({ values }) => (
        <Form>
          <h2 className={styles['profile-h2']}>Zmień email</h2>
          <div className='shadow p-4 bg-white rounded-5'>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Nowe adres e-mail' name='new_email' type='email' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Powtórz nowe adres e-mail' name='re_new_email' type='email' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Twoje aktualne hasło' name='current_password' type='password' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <button type='submit' className={styles['yellow-btn']}>
                  Zapisz
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ChangeEmailForm
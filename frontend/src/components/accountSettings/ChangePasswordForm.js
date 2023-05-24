import { Formik, Form } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { change_password } from '../../actions/authActions'
import { TextField } from '../formHelpers'
import { validateChangePassword } from '../../validators/validators'
import styles from '../company/CompanyProfileForm.module.css'

const ChangePasswordForm = () => {
  const dispatch = useDispatch()

  const initialValues = {
    current_password: '',
    new_password: '', 
    re_new_password: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangePassword}
      onSubmit={(values, { resetForm }) => {
        const { new_password, re_new_password, current_password } = values
        dispatch(change_password(new_password, re_new_password, current_password))
        resetForm({ values: '' })
      }}
    >
      {({ values }) => (
        <Form>
          <h2 className={styles['profile-h2']}>Zmień hasło</h2>
          <div className='shadow p-4 bg-white rounded-5'>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Aktualne hasło' name='current_password' type='password' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Nowe hasło' name='new_password' type='password' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <TextField label='Powtórz nowe hasło' name='re_new_password' type='password' />
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

export default ChangePasswordForm
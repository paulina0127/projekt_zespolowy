import { Formik, Form } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { delete_account } from '../../actions/authActions'
import { TextField } from '../formHelpers'
import { validateDeleteAccount } from '../../validators/validators'
import styles from '../company/CompanyProfileForm.module.css'

const DeleteAccountForm = () => {
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{current_password: ''}}
      validationSchema={validateDeleteAccount}
      onSubmit={(values, { resetForm }) => {
        dispatch(delete_account(values.current_password))
        resetForm({ values: '' })
      }}
    >
      {({ values }) => (
        <Form>
          <h2 className={styles['profile-h2']}>Usuń konto</h2>
          <div className='shadow p-3 bg-white rounded-5 w-100'>
            <Row className='align-items-center justify-content-evenly'>
              <p className={styles['profile-p']}>
                Usunięcie konta jest nieodwracalne. Prosimy o rozważenie swojej
                decyzji.
              </p>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6} lg={3}>
                <TextField label='Wprowadź aktualne hasło' name='current_password' type='password' />
              </Col>
            </Row>
            <Row className='align-items-center justify-content-evenly'>
              <Col md={6}>
                <button type='submit' className={styles['delete-btn']}>
                Usuń
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default DeleteAccountForm
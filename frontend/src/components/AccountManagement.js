import { Formik, Form } from 'formik'
import { TextField } from './TextField'

import styles from './ComapnyProfileForm.module.css'

const AccountManagement = ({}) => {
  return (
    <div>
      <Formik>
        <Form>
          <h2 className={styles['profile-h2']}>Zmień email</h2>
          <div className={styles['white-bg']}>
            <div className='container p-5'>
              <div className='row align-items-center justify-content-evenly me-auto'>
                <div className='col col-6'>
                  <h4 className={styles['profile-h4']}>Email</h4>
                  <TextField name='email' type='text' />
                </div>
              </div>
            </div>
            <div class='d-grid col-2 mx-auto'>
              <button
                type='submit'
                className='btn btn-warning rounded-pill fw-bold shadow-sm '
              >
                Zapisz
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <Formik>
        <Form>
          <h2 className={styles['profile-h2']}>Zmień hasło</h2>
          <div className={styles['white-bg']}>
            <form>
              <div className='container p-5'>
                <div className='row align-items-center justify-content-evenly me-auto'>
                  <div className='col col-4'>
                    <h4 className={styles['profile-h4']}>Aktualne hasło</h4>
                    <TextField name='old-password' type='text' />
                  </div>
                  <div className='col col-4'>
                    <h4 className={styles['profile-h4']}>Nowe hasło</h4>
                    <TextField name='new-password' type='text' />
                  </div>
                </div>
              </div>
              <div class='d-grid col-2 mx-auto'>
                <button
                  type='submit'
                  className='btn btn-warning rounded-pill fw-bold  shadow-sm '
                >
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </Form>
      </Formik>
      <h2 className={styles['profile-h2']}>Usuń konto</h2>
      <div className='d-flex flex-row justify-content-around'>
        <div className={styles['white-bg']}>
          <p className={styles['profile-p']}>
            Usunięcie konta jest nieodwracalne. Prosimy o rozważenie swojej
            decyzji.
          </p>
          <div class='d-grid col-2 mx-auto'>
            <button
              type='submit'
              className='btn btn-danger rounded-pill fw-bold shadow-sm '
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountManagement

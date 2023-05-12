import { Formik, Form } from 'formik'
import { TextField } from './formHelpers'
import UserPanelLayout from '../hocs/UserPanelLayout'
import styles from './company/CompanyProfileForm.module.css'

const AccountManagement = () => {
  return (
    <UserPanelLayout>
      <div className='container text-center mt-5 mb-5'>
        <div className='row align-items-center justify-content-center'>
          <div className='col'>
            <Formik>
              <Form>
                <h2 className={styles['profile-h2']}>Zmień email</h2>
                <div className='shadow p-4 bg-white rounded-5'>
                  <div className='container p-5'>
                    <div className='row align-items-center justify-content-evenly me-auto'>
                      <div className='col col-8'>
                        <TextField label='Email' name='email' type='text' />
                      </div>
                    </div>
                  </div>
                  <div className='d-grid col-2 mx-auto'>
                    <button type='submit' className={styles['yellow-btn']}>
                      Zapisz
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
          <div className='col'>
            <Formik>
              <Form>
                <h2 className={styles['profile-h2']}>Zmień hasło</h2>
                <div className='shadow p-4 bg-white rounded-5'>
                  <div className='row align-items-center justify-content-evenly'>
                    <div className='col-6'>
                      <TextField
                        label='Aktualne hasło'
                        name='old-password'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='row align-items-center justify-content-evenly'>
                    <div className='col-6'>
                      <TextField
                        label='Nowe hasło'
                        name='new-password'
                        type='text'
                      />
                    </div>
                  </div>
                  <div className='d-grid col-2 mx-auto'>
                    <button type='submit' className={styles['yellow-btn']}>
                      Zapisz
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
          <h2 className={styles['profile-h2']}>Usuń konto</h2>
          <div className='d-flex flex-row justify-content-around'>
            <div className='shadow p-3 bg-white rounded-5 w-100'>
              <p className={styles['profile-p']}>
                Usunięcie konta jest nieodwracalne. Prosimy o rozważenie swojej
                decyzji.
              </p>
              <div className='d-grid col-1 mx-auto'>
                <button
                  type='submit'
                  className='btn btn-danger rounded-pill shadow-sm '
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPanelLayout>
  )
}

export default AccountManagement

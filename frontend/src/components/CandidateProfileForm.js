import { Formik, Form } from 'formik'
import { TextField } from './TextField'
import Image from 'react-bootstrap/Image'

import styles from './ComapnyProfileForm.module.css'
import { FaPlus } from 'react-icons/fa'
import placeholder from '../images/avatar.png'

const CandidateProfileForm = ({}) => {
  return (
    <div>
      <h2 className={styles['profile-h2']}>Dane osobowe</h2>
      <div className={styles['white-bg']}>
        <Formik>
          <Form>
            <div className='container p-5'>
              <div className='d-flex row justify-content-around '>
                <div className='col col-4 align-self-center text-center'>
                  <div className='row'>
                    <div className={styles['avatar-title']}>Avatar</div>
                  </div>
                  <div className='row top-50'>
                    <button className={styles['avatar-btn']}>
                      <FaPlus size='2.5em' color='#242424' />
                    </button>
                  </div>
                  <div className='row'>
                    <Image
                      style={{ width: '300px', margin: '20px auto' }}
                      src={placeholder}
                      alt='User pic'
                      roundedCircle
                    />
                  </div>
                </div>
                <div className='col col-4'>
                  <h4 className={styles['profile-h4']}>Imię</h4>
                  <TextField name='first-name' type='text' />
                  <h4 className={styles['profile-h4']}>Nazwisko</h4>
                  <TextField name='last-name' type='text' />
                  <h4 className={styles['profile-h4']}>Email</h4>
                  <TextField name='email' type='text' />
                  <h4 className={styles['profile-h4']}>Telefon</h4>
                  <TextField name='phone-number' type='text' />
                  <h4 className={styles['profile-h4']}>Pesel</h4>
                  <TextField name='pesel' type='text' />
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
          </Form>
        </Formik>
      </div>
      <h2 className={styles['profile-h2']}>Usuń profil</h2>
      <div className='d-flex flex-row justify-content-around'>
        <div className={styles['white-bg']}>
          <p className={styles['profile-p']}>
            Usunięcie profilu jest nieodwracalne. Prosimy o rozważenie swojej
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

export default CandidateProfileForm

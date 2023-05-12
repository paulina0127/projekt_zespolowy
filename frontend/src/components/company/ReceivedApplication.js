import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './ReceivedApplication.module.css'

const ReceivedApplication = ({}) => {
  return (
    <UserPanelLayout>
      <div>
        <h2 className={styles['apps-h2']}>Otrzymane aplikacje</h2>
        <div className='container'>
          <div className='shadow p-3 bg-white rounded-pill m-2'>
            <div className='d-flex row align-items-center justify-content-around col-lg-12'>
              <div className='col'>
                <div>
                  <img
                    style={{ width: 50, height: 50 }}
                    src='/static/media/profile_pic.de766c8d8717b7577e86.jpg'
                    alt='profile logo'
                    className='rounded-circle w-5'
                  ></img>
                </div>
              </div>
              <div className='col-2'>
                <h4 className={styles['apps-h4']}>Imię</h4>
              </div>
              <div className='col-2'>
                <h4 className={styles['apps-h4']}>Nazwisko</h4>
              </div>
              <div className='col-2'>
                <h4 className={styles['apps-h4']}>Stanowisko</h4>
              </div>
              <div class='col'>
                <button type='submit' className={styles['yellow-btn']}>
                  Wyświetl
                </button>
              </div>
              <div class='col'>
                <button
                  type='submit'
                  className='btn btn-success rounded-pill fw-bold  shadow-sm '
                >
                  Akceptuj
                </button>
              </div>
              <div class='col'>
                <button
                  type='submit'
                  className='btn btn-danger rounded-pill fw-bold shadow-sm '
                >
                  Odrzuć
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPanelLayout>
  )
}

export default ReceivedApplication

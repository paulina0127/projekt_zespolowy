import UserPanelLayout from '../../hocs/UserPanelLayout'
import { FaChec, FaTimes, FaHourglassStart } from 'react-icons/fa'
import styles from '../company/CompanyProfileForm.module.css'

const CandidateApplications = ({}) => {
  return (
    <UserPanelLayout>
      <div>
        <h2 className={styles['profile-h2']}>Wysłane aplikacje</h2>
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
                <h4 className={styles['profile-h4']}>Imię</h4>
              </div>
              <div className='col-2'>
                <h4 className={styles['profile-h4']}>Nazwisko</h4>
              </div>
              <div className='col-2'>
                <h4 className={styles['profile-h4']}>Stanowisko</h4>
              </div>
              <div class='col'>
                <button type='submit' className={styles['yellow-btn']}>
                  Wyświetl
                </button>
              </div>
              <div className='col text-center'>
                {/* FaCheck, FaTimes, FaHourglassStart w zależności od statusu aplikacji*/}
                <FaTimes size='2em ' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPanelLayout>
  )
}

export default CandidateApplications

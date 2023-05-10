import { FaFile, FaPlus } from 'react-icons/fa'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './Attachement.module.css'


const Attachement = () => {
  return (
    <UserPanelLayout>
      <div>
        <h2 className={styles['doc-h2']}>Dokumenty</h2>
        <div className='d-flex flex-row'>
          <button className={styles['doc-btn']}>
            <FaFile size='5em' color='#242424' />
          </button>
          <button className={styles['doc-btn']}>
            <FaPlus size='5em' color='#242424' />
          </button>
        </div>
      </div>
    </UserPanelLayout>
  )
}

export default Attachement

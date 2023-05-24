import OfferForm from './OfferForm'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../../screens/MainPanelScreen.module.css'

const NewOffer = () => {
  return (
    <UserPanelLayout>
      <div className='container justify-content-center px-4 py-5 my-3'>
        <h2 className={styles['panel-h2']}>Nowa oferta pracy:</h2>
        <div className='shadow p-3 bg-white rounded-5 m-2'>
          <OfferForm type='create'/>
        </div>
      </div>
    </UserPanelLayout> 
  )
}

export default NewOffer
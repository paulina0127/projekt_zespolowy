import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { listFilteredOffers } from '../actions/offerActions'
import { OFFER_FILTERED_LIST_CLEAR } from '../constants/offerConst'
import { OFFER_DELETE_RESET } from '../constants/offerConst'
import OfferForCompany from './OfferForCompany'
import CreateOfferForm from './CreateOfferForm'
import styles from './OfferForCompany.module.css'
import { AiOutlineFileAdd } from 'react-icons/ai'
import Loader from './Loader'
import Message from './Message'

import styles from '../screens/MainPanelScreen.module.css'

const CompanyOffers = () => {
  const [showOfferForm, setShowOfferForm] = useState(false)

  const company_id = useSelector(state => state.auth.user.profile)

  const offerList = useSelector(state => state.offerList)
  const { offers, loading, length, error } = offerList

  const offerDelete = useSelector(state => state.offerDelete)
  const { successDeleteOffer, errorDeleteOffer, loadingDeleteOffer } = offerDelete

  const dispatch = useDispatch()


  const params = {
    all: true,
    company: company_id,
  }

  useEffect(() => {
    return () => {
      dispatch({ type: OFFER_DELETE_RESET })
    }
  }, [])

  useEffect(() => {
    dispatch(listFilteredOffers(params))
    return () => {
      dispatch({ type: OFFER_FILTERED_LIST_CLEAR })
    }
  }, [dispatch, successDeleteOffer])

  return (
    <div className='container justify-content-center px-4 py-5 my-3'>
      {!showOfferForm ?
       <>
        <div className={styles['white-bg']}>
          <button
            className='btn btn-success'
            onClick={() => setShowOfferForm((prev) => !prev)}
          >
            Dodaj ofertę +
          </button>
        {loadingDeleteOffer && <Loader />} 
        {errorDeleteOffer && <Message variant='danger'>{errorDeleteOffer}</Message>}
        {successDeleteOffer && <Message variant='success'>Oferta pracy została usunięta</Message>} 
        { loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          : length === 0 ? <Message variant='info'>Nie dodano jeszcze żadnych ofert pracy</Message>
          :
          <ul className='col-12'>
            {offers.map(offer => <OfferForCompany key={offer.id} offer={offer}/>
            )}
          </ul>
        }
        </div>
      </>
      : 
        <>
          <h2> Nowa oferta pracy:</h2>
          <div className={styles['white-bg']}>
            <CreateOfferForm />
          </div>
        </>
      }
    </div>
  )
}

export default CompanyOffers

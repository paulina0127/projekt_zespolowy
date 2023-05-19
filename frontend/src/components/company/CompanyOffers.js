import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listFilteredOffers } from '../../actions/offerActions'
import { OFFER_FILTERED_LIST_CLEAR } from '../../constants/offerConst'
import { OFFER_DELETE_RESET } from '../../constants/offerConst'
import OfferForCompany from './OfferForCompany'
import { AiOutlineFileAdd } from 'react-icons/ai'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import { Loader, Message } from '../basics'

import styles from '../../screens/MainPanelScreen.module.css'
import styles2 from './OfferForCompany.module.css'

const CompanyOffers = () => {
  const company_id = useSelector((state) => state.auth.user.profile.id)

  const offerList = useSelector((state) => state.offerList)
  const { offers, loading, length, error } = offerList

  const offerDelete = useSelector((state) => state.offerDelete)
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
    <UserPanelLayout>
      <div className='container justify-content-center px-4 py-5 my-3'>
        <Link to='/user-panel/nowa-oferta'>
          <button className={`btn btn-success rounded-circle ${styles2.addOfferBtn}`}>
            <AiOutlineFileAdd />
          </button>
        </Link>
        {loadingDeleteOffer && <Loader />}
        {errorDeleteOffer && (
          <Message variant='danger'>{errorDeleteOffer}</Message>
        )}
        {successDeleteOffer && (
          <Message variant='success'>Oferta pracy została usunięta</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : length === 0 ? (
          <Message variant='info'>
            Nie dodano jeszcze żadnych ofert pracy
          </Message>
        ) : (
          <ul className='col-12'>
            <h2 className={styles['panel-h2']}>Moje oferty pracy: {length}</h2>
            {offers.map((offer) => (
              <OfferForCompany key={offer.id} offer={offer} />
            ))}
          </ul>
        )}
      </div>
    </UserPanelLayout>
  )
}

export default CompanyOffers



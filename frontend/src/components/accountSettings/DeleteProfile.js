import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserProfile } from '../../actions/userActions'
import { MyModal } from '../basics'
import styles from '../company/CompanyProfileForm.module.css'

const DeleteProfile = ({ userProfile }) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const type = useSelector((state) => state.auth.user.type)
  const loading = useSelector((state) => state.userProfileDetails.loading)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteUserProfile(userProfile, type))
  }

  return (
    <>
      {loading ? '' : ( 
      <>
      <h2 className={styles['profile-h2']}>Usuń profil</h2>
      <div className='d-flex flex-row justify-content-around m-5'>
        <div className={styles['white-bg']}>
          <p className={styles['profile-p']}>
            Usunięcie profilu jest nieodwracalne. Prosimy o rozważenie swojej
            decyzji.
          </p>
          <div className='d-grid col-3 mx-auto'>
            <button
              type='submit'
              onClick={() => setShowModal(true)}
              className='btn btn-danger rounded-pill fw-bold shadow-sm'
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <MyModal
          showModal={true}
          title='Usuwanie profilu'
          danger='reject' 
        >
          <p>Operacja usunięcia profilu jest nieodwracalna, prosimy o rozważenie tej decyzji</p>
          <hr className='text-secondary' />
          <div className='d-flex justify-content-center'>
            <button
              type='button'
              className='btn btn-secondary rounded-pill fw-bold shadow-sm mx-2 px-5'
              onClick={() => setShowModal(false)}
            >
              Wróć
            </button>
            <button
              type='button'
              className={`btn btn-danger rounded-pill fw-bold shadow-sm px-5`}
              onClick={handleSubmit}
            >
              Usuwam profil
            </button>
          </div>
        </MyModal>
      )}
      </>
      )}
    </>
  )
}

export default DeleteProfile

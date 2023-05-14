import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md'
import { getCandidateLinks } from '../../actions/userActions'
import { deleteCandidateComponent } from '../../actions/candidateActions'
import { MyModal, Loader, Message } from '../basics'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import LinkForm from './LinkForm'
import CandidateInfoDelete from './CandidateInfoDelete'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './CandidateInfo.module.css'

const CandidateLinks = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editLinkIndex, setEditLinkIndex] = useState(null)
  const [deleteLinkIndex, setDeleteLinkIndex] = useState(null)

  const profile = useSelector(state => state.auth.user.profile.id)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (index) => {
    setEditLinkIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditLinkIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteLinkIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteLinkIndex(null)
  }

  const handleDeleteLink = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'links'))
    setDeleteLinkIndex(null)
  }

  const details = useSelector(state => state.userProfileDetails)
  const { linkList } = details

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCandidateLinks(profile))
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET })
    }
  }, [dispatch, success])

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <div className={styles['table-wrapper']}>
          <div className={styles['table-title']}>
            <div className='row'>
              <div className='col-sm-6 col-md-6'>
                <h2>Moje linki</h2>
              </div>
              <div className='col-sm-6'>
                <button 
                  className={`btn btn-success ${styles['table_add_button']}`} 
                  onClick={handleShowAddModal}
                >
                  Nowy link <MdAddCircle />
              </button>				
              </div>
            </div>
          </div>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Rodzaj</th>
                <th>Adres URL</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && linkList && linkList.results && linkList.results.map((link, index) => 
              <tr key={link.id}>
                <td>{link.type}</td>
                <td>{link.url}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editLinkIndex === index && (
                <MyModal
                  showModal={true}
                  title='Edytowanie linku'
                  handleCloseModal={handleCloseEditModal}
                >
                  <LinkForm
                    link={link}
                    type='update'
                    handleCloseModal={handleCloseEditModal}
                    label='Zapisz'
                  />
                </MyModal>
                )}
                {deleteLinkIndex === index && (
                <MyModal
                  showModal={true}
                  title='Usuwanie linku'
                  danger={true}
                  handleCloseModal={handleCloseEditModal}
                >
                   <CandidateInfoDelete
                    name='ten link'
                    handleCloseModal={handleCloseDeleteModal}
                    id={link.id}
                    handleDelete={handleDeleteLink}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowy link'>
      <LinkForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj'/>
      </MyModal> }
    
    </UserPanelLayout>
  )
}
export default CandidateLinks
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete, MdContentPasteSearch } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { MyModal, Loader, Message } from '../basics'
import { getCandidateFiles } from '../../actions/userActions'
import { deleteCandidateComponent } from '../../actions/candidateActions'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import AttachementForm from './AttachementForm'
import CandidateInfoDelete from './CandidateInfoDelete'
import styles from './CandidateInfo.module.css'

const Attachement = () => {
  const dispatch = useDispatch()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editFileIndex, setEditFileIndex] = useState(null)
  const [deleteFileIndex, setDeleteFileIndex] = useState(null)

  const files = useSelector((state) => state.userProfileDetails.filesList)
  const profile = useSelector((state) => state.auth.user.profile.id)

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (index) => {
    setEditFileIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditFileIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteFileIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteFileIndex(null)
  }

  const handleDeleteFile = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'files'))
    setDeleteFileIndex(null)
  }

  useEffect(() => {
    dispatch(getCandidateFiles(profile))
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
                <h2>Moje dokumenty</h2>
              </div>
              <div className='col-sm-6'>
                <button className={styles['doc-btn']} onClick={handleShowAddModal}>
                  <FaPlus size='2rem' color='#242424' />
                </button>
              </div>
            </div>
          </div>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Rodzaj</th>
                <th>Nazwa</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && files?.results.map((file, index) => 
              <tr key={file.id}>
                <td>{file.type}</td>
                <td>{file.name}</td>
                <td>
                  <Link to={file.path}>
                    <MdContentPasteSearch />
                  </Link>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editFileIndex === index && (
                <MyModal
                  showModal={true}
                  title='Edytowanie pliku'
                  handleCloseModal={handleCloseEditModal}
                >
                  <AttachementForm
                    file={file}
                    type='update'
                    handleCloseModal={handleCloseEditModal}
                    label='Zapisz'
                    profile={profile}
                  />
                </MyModal>
                )}
                {deleteFileIndex === index && (
                <MyModal
                  showModal={true}
                  title='Usuwanie pliku'
                  danger={true}
                  handleCloseModal={handleCloseEditModal}
                >
                   <CandidateInfoDelete
                    name='ten plik'
                    handleCloseModal={handleCloseDeleteModal}
                    id={file.id}
                    handleDelete={handleDeleteFile}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowy plik'>
      <AttachementForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj' profile={profile}/>
      </MyModal> }
    </UserPanelLayout>
  )
}

export default Attachement

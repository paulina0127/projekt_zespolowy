import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { getCandidateEducation } from '../../actions/userActions'
import { deleteCandidateComponent } from '../../actions/candidateActions'
import { MyModal, Loader, Message } from '../basics'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import EducationForm from './EducationForm'
import CandidateInfoDelete from './CandidateInfoDelete'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './CandidateInfo.module.css'

const CandidateEducation = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editEducationIndex, setEditEducationIndex] = useState(null)
  const [deleteEducationIndex, setDeleteEducationIndex] = useState(null)

  const profile = useSelector(state => state.auth.user.profile.id)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (index) => {
    setEditEducationIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditEducationIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteEducationIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteEducationIndex(null)
  }

  const handleDeleteEducation = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'education'))
    setDeleteEducationIndex(null)
  }

  const details = useSelector(state => state.userProfileDetails)
  const { educationList } = details

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCandidateEducation(profile))
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
                <h2>Moje wykształcenie</h2>
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
                <th>Uczelnia</th>
                <th>Poziom wykształcenia</th>
                <th>Kierunek</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && educationList && educationList.results && educationList.results.map((education, index) => 
              <tr key={education.id}>
                <td>{education.institute}</td>
                <td>{education.education_level}</td>
                <td>{education.major ? education.major : ''}</td>
                <td>{education.start_date}</td>
                <td>{education.end_date ? education.end_date : ''}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editEducationIndex === index && (
                <MyModal
                  showModal={true}
                  title='Edytowanie wykształcenia'
                >
                  <EducationForm
                    education={education}
                    type='update'
                    handleCloseModal={handleCloseEditModal}
                    label='Zapisz'
                  />
                </MyModal>
                )}
                {deleteEducationIndex === index && (
                <MyModal
                  showModal={true}
                  title='Usuwanie wykształcenia'
                  danger={true}
                >
                   <CandidateInfoDelete
                    name='te wykształcenie'
                    handleCloseModal={handleCloseDeleteModal}
                    id={education.id}
                    handleDelete={handleDeleteEducation}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowe wykształcenie'>
      <EducationForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj'/>
      </MyModal> }
    
    </UserPanelLayout>
  )
}

export default CandidateEducation

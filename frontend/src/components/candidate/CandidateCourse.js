import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { getCandidateCourses } from '../../actions/userActions'
import { deleteCandidateComponent } from '../../actions/candidateActions'
import { MyModal, Loader, Message } from '../basics'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import CourseForm from './CourseForm'
import CandidateInfoDelete from './CandidateInfoDelete'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './CandidateInfo.module.css'

const CandidateCourse = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editCourseIndex, setEditCourseIndex] = useState(null)
  const [deleteCourseIndex, setDeleteCourseIndex] = useState(null)

  const profile = useSelector(state => state.auth.user.profile.id)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (index) => {
    setEditCourseIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditCourseIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteCourseIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteCourseIndex(null)
  }

  const handleDeleteCourse = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'skills'))
    setDeleteCourseIndex(null)
  }

  const details = useSelector(state => state.userProfileDetails)
  const { courseList } = details

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCandidateCourses(profile))
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
                <h2>Moje kursy</h2>
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
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && courseList && courseList.results && courseList.results.map((course, index) => 
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.description ? course.description : ''}</td>
                <td>{course.start_date}</td>
                <td>{course.end_date}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editCourseIndex === index && (
                <MyModal
                  showModal={true}
                  title='Edytowanie kursu'
                >
                  <CourseForm
                    course={course}
                    type='update'
                    handleCloseModal={handleCloseEditModal}
                    label='Zapisz'
                  />
                </MyModal>
                )}
                {deleteCourseIndex === index && (
                <MyModal
                  showModal={true}
                  title='Usuwanie kursu'
                  danger={true}
                >
                   <CandidateInfoDelete
                    name='ten kurs'
                    handleCloseModal={handleCloseDeleteModal}
                    id={course.id}
                    handleDelete={handleDeleteCourse}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowy kurs'>
      <CourseForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj'/>
      </MyModal> }
    
    </UserPanelLayout>
  )
}

export default CandidateCourse
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md'
import { getCandidateSkills } from '../../actions/userActions'
import { deleteCandidateComponent } from '../../actions/candidateActions'
import { MyModal, Loader, Message } from '../basics'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst'
import SkillForm from './SkillForm'
import CandidateInfoDelete from './CandidateInfoDelete'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './CandidateInfo.module.css'

const CandidateSkill = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editSkillIndex, setEditSkillIndex] = useState(null)
  const [deleteSkillIndex, setDeleteSkillIndex] = useState(null)

  const profile = useSelector(state => state.auth.user.profile.id)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }
  const handleShowEditModal = (index) => {
    setEditSkillIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditSkillIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteSkillIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteSkillIndex(null)
  }

  const handleDeleteSkill = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'skills'))
    setDeleteSkillIndex(null)
  }

  const details = useSelector(state => state.userProfileDetails)
  const { skillList } = details

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getCandidateSkills(profile))
  //   return () => {
  //     dispatch({ type: USER_DETAILS_PROFILE_RESET })
  //   }
  // }, [dispatch, success])

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <div className={styles['table-wrapper']}>
          <div className={styles['table-title']}>
            <div className='row'>
              <div className='col-sm-6 col-md-6'>
                <h2>Moje umiejętności</h2>
              </div>
              <div className='col-sm-6'>
                <button 
                  className={`btn btn-success ${styles['table_add_button']}`} 
                  onClick={handleShowAddModal}
                >
                  Nowa umiejętność <MdAddCircle />
              </button>				
              </div>
            </div>
          </div>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Rodzaj</th>
                <th>Poziom</th>
                <th>Certyfikat</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && skillList && skillList.results && skillList.results.map((skill, index) => 
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.type}</td>
                <td>{skill.level ? skill.level : ''}</td>
                <td>{skill.certificate ? skill.certificate : ''}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editSkillIndex === index && (
                <MyModal
                  showModal={true}
                  title='Edytowanie umiejętności'
                  handleCloseModal={handleCloseEditModal}
                >
                  <SkillForm
                    skill={skill}
                    type='update'
                    handleCloseModal={handleCloseEditModal}
                    label='Zapisz'
                  />
                </MyModal>
                )}
                {deleteSkillIndex === index && (
                <MyModal
                  showModal={true}
                  title='Usuwanie umiejętności'
                  danger={true}
                  handleCloseModal={handleCloseEditModal}
                >
                   <CandidateInfoDelete
                    name='tę umiejętność'
                    handleCloseModal={handleCloseDeleteModal}
                    id={skill.id}
                    handleDelete={handleDeleteSkill}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowa umiejętność'>
      <SkillForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj'/>
      </MyModal> }
    
    </UserPanelLayout>
  )
}

export default CandidateSkill
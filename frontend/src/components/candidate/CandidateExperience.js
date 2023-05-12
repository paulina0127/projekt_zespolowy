import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md'
import { getCandidateExperience } from '../../actions/userActions'
import { deleteExperience } from '../../actions/candidateActions'
import { MyModal, Loader, Message } from '../basics'
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import ExperienceForm from './ExperienceForm'
import CandidateInfoDelete from './CandidateInfoDelete';
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from './CandidateExperience.module.css'

const CandidateExperience = () => {
  const [changeExperience, setChangeExperience] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editExperienceIndex, setEditExperienceIndex] = useState(null)
  const [deleteExperienceIndex, setDeleteExperienceIndex] = useState(null)

  const profile = useSelector(state => state.auth.user.profile.id)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  }
  const handleShowEditModal = (index) => {
    setEditExperienceIndex(index)
  }
  const handleCloseEditModal = () => {
    setEditExperienceIndex(null)
  }
  const handleShowDeleteModal = (index) => {
    setDeleteExperienceIndex(index)
  }
  const handleCloseDeleteModal = () => {
    setDeleteExperienceIndex(null)
  }

  const handleDeleteExperience = (id) => {
    dispatch(deleteExperience(profile, id))
    setDeleteExperienceIndex(null)
  }

  const details = useSelector(state => state.userProfileDetails)
  const { experienceList } = details

  const candidateAction = useSelector(state => state.candidate)
  const { error, success, loading } = candidateAction

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCandidateExperience(profile))
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET })
    }
  }, [dispatch, success])

  return (
    <UserPanelLayout>
      <div className="container mt-3">
        {loading && <Loader />}
        {success && <Message variant='success'>Zapisano</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        <div className={styles['table-wrapper']}>
          <div className={styles['table-title']}>
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <h2>Moje doświadczenie</h2>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-success" onClick={handleShowAddModal}>Nowe doświadczenie <MdAddCircle /></button>				
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Stanowisko</th>
                <th>Nazwa firmy</th>
                <th>Lokalizacja</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {!loading && experienceList && experienceList.results && experienceList.results.map((experience, index) => 
              <tr key={experience.id}>
                <td>{experience.position}</td>
                <td>{experience.company}</td>
                <td>{experience.location ? experience.location.street_address + ', ' + experience.location.postal_code + ' ' + experience.location.city : ''}</td>
                <td>{experience.start_date}</td>
                <td>{experience.end_date ? experience.end_date : ''}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75'/>
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753'/>
                  </span>
                </td>
                {editExperienceIndex === index && (
                <MyModal
                  showModal={true}
                  title="Edytowanie doświadczenia"
                  handleCloseModal={handleCloseEditModal}
                >
                  <ExperienceForm
                    experience={experience}
                    type="update"
                    handleCloseModal={handleCloseEditModal}
                    label="Zapisz"
                  />
                </MyModal>
                )}
                {deleteExperienceIndex === index && (
                <MyModal
                  showModal={true}
                  title="Usuwanie doświadczenia"
                  danger={true}
                  handleCloseModal={handleCloseEditModal}
                >
                   <CandidateInfoDelete
                    name='doświadczenie'
                    handleCloseModal={handleCloseDeleteModal}
                    id={experience.id}
                    handleDelete={handleDeleteExperience}
                   />
                </MyModal>
                )}
              </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
    {showAddModal &&  <MyModal showModal={showAddModal}  title='Nowe doświadczenie'>
      <ExperienceForm type='create' handleCloseModal={handleCloseAddModal} label='Dodaj'/>
      </MyModal> }
    
    </UserPanelLayout>
  );
};

export default CandidateExperience;

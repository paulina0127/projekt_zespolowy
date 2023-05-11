import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete, MdAddCircle } from 'react-icons/md'
import { getCandidateExperience } from '../../actions/userActions'
import { MyModal } from '../basics'
import ExperienceForm from './ExperienceForm';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import styles from './CandidateExperience.module.css';

const CandidateExperience = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleShowAddModal = () => {
    setShowAddModal(true)
  }
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleShowEditModal = () => {
    setShowEditModal(true)
  }
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const profile = useSelector(state => state.auth.user.profile.id);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCandidateExperience(profile))
    // return () => {
    //   dispatch({ type: USER_DETAILS_PROFILE_RESET })
    // }
  }, [dispatch])

  const details = useSelector(state => state.userProfileDetails)
  const { experienceList } = details

  return (
    <UserPanelLayout>
      <div className="container">
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
              {experienceList && experienceList.results && experienceList.results.map((experience) => 
              <tr key={experience.id}>
                <td>{experience.position}</td>
                <td>{experience.company}</td>
                <td>{experience.location.street_address}, {experience.location.postal_code} {experience.location.city}</td>
                <td>{experience.start_date}</td>
                <td>{experience.end_date}</td>
                <td>
                  <span onClick={setShowEditModal}><MdEdit color='#00BE75'/></span>
                  <span><MdDelete color='#DA4753'/></span>
                </td>
                {showEditModal &&  <MyModal showModal={showEditModal}  title='Edytowanie doświadczenia'>
                <ExperienceForm experience={experience} type='update' handleCloseModal={handleCloseEditModal} label='Zapisz'/>
                </MyModal> }
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

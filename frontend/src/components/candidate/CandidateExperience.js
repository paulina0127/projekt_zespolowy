import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { getCandidateExperience } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { MyModal, Loader, Message } from '../basics';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import CandidateTable from './CandidateTable';
import ExperienceForm from './ExperienceForm';
import CandidateInfoDelete from './CandidateInfoDelete';

const CandidateExperience = () => {
  const profile = useSelector((state) => state.auth.user?.profile?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editExperienceIndex, setEditExperienceIndex] = useState(null);
  const [deleteExperienceIndex, setDeleteExperienceIndex] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditExperienceIndex(index);
  const handleCloseEditModal = () => setEditExperienceIndex(null);

  const handleShowDeleteModal = (index) => setDeleteExperienceIndex(index);
  const handleCloseDeleteModal = () => setDeleteExperienceIndex(null);

  const handleDeleteExperience = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'experience'));
    setDeleteExperienceIndex(null);
  };

  const experienceList = useSelector(
    (state) => state.userProfileDetails.experienceList
  );

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCandidateExperience(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = [
    'Stanowisko',
    'Nazwa firmy',
    'Lokalizacja',
    'Data rozpoczęcia',
    'Data zakończenia',
    'Aktualna',
    'Akcje',
  ];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje doświadczenie'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            experienceList &&
            experienceList.results.map((experience, index) => (
              <tr key={experience.id}>
                <td>{experience.position}</td>
                <td>{experience.company}</td>
                <td>
                  {experience.location
                    ? experience.location.street_address +
                      ', ' +
                      experience.location.postal_code +
                      ' ' +
                      experience.location.city
                    : ''}
                </td>
                <td>{experience.start_date}</td>
                <td>{experience.end_date ? experience.end_date : ''}</td>
                <td>{experience.is_current === true ? 'Tak' : 'Nie'}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editExperienceIndex === index && (
                  <MyModal showModal={true} title='Edytowanie doświadczenia'>
                    <ExperienceForm
                      experience={experience}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
                    />
                  </MyModal>
                )}
                {deleteExperienceIndex === index && (
                  <MyModal
                    showModal={true}
                    title='Usuwanie doświadczenia'
                    danger={true}
                  >
                    <CandidateInfoDelete
                      name='te doświadczenie'
                      id={experience.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteExperience}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
        {loading && <Loader />}
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowe doświadczenie'>
          <ExperienceForm
            type='create'
            handleCloseModal={handleCloseAddModal}
          />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};

export default CandidateExperience;

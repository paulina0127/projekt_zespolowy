import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { getCandidateEducation } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import { MyModal, Loader, Message } from '../basics';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import CandidateTable from './CandidateTable';
import EducationForm from './EducationForm';
import CandidateInfoDelete from './CandidateInfoDelete';

const CandidateEducation = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editEducationIndex, setEditEducationIndex] = useState(null);
  const [deleteEducationIndex, setDeleteEducationIndex] = useState(null);

  const profile = useSelector((state) => state.auth.user?.profile?.id);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditEducationIndex(index);
  const handleCloseEditModal = () => setEditEducationIndex(null);

  const handleShowDeleteModal = (index) => setDeleteEducationIndex(index);
  const handleCloseDeleteModal = () => setDeleteEducationIndex(null);

  const handleDeleteEducation = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'education'));
    setDeleteEducationIndex(null);
  };

  const educationList = useSelector(
    (state) => state.userProfileDetails.educationList
  );

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidateEducation(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = [
    'Uczelnia',
    'Poziom wykształcenia',
    'Kierunek',
    'Data rozpoczęcia',
    'Data zakończenia',
    'Akcje',
  ];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje wykształcenie'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            educationList &&
            educationList.results.map((education, index) => (
              <tr key={education.id}>
                <td>{education.institute}</td>
                <td>{education.education_level}</td>
                <td>{education.major ? education.major : ''}</td>
                <td>{education.start_date}</td>
                <td>{education.end_date ? education.end_date : ''}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editEducationIndex === index && (
                  <MyModal showModal={true} title='Edytowanie wykształcenia'>
                    <EducationForm
                      education={education}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
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
                      id={education.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteEducation}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowe wykształcenie'>
          <EducationForm type='create' handleCloseModal={handleCloseAddModal} />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};

export default CandidateEducation;

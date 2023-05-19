import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { getCandidateSkills } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { MyModal, Loader, Message } from '../basics';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import SkillForm from './SkillForm';
import CandidateInfoDelete from './CandidateInfoDelete';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import CandidateTable from './CandidateTable';

const CandidateSkill = () => {
  const profile = useSelector((state) => state.auth.user?.profile?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSkillIndex, setEditSkillIndex] = useState(null);
  const [deleteSkillIndex, setDeleteSkillIndex] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditSkillIndex(index);
  const handleCloseEditModal = () => setEditSkillIndex(null);

  const handleShowDeleteModal = (index) => setDeleteSkillIndex(index);
  const handleCloseDeleteModal = () => setDeleteSkillIndex(null);

  const handleDeleteSkill = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'skills'));
    setDeleteSkillIndex(null);
  };

  const skillList = useSelector((state) => state.userProfileDetails.skillList);

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidateSkills(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = ['Nazwa', 'Rodzaj', 'Poziom', 'Certyfikat', 'Akcje'];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje umiejętności'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            skillList &&
            skillList.results.map((skill, index) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.type}</td>
                <td>{skill.level ? skill.level : ''}</td>
                <td>{skill.certificate ? skill.certificate : ''}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editSkillIndex === index && (
                  <MyModal showModal={true} title='Edytowanie umiejętności'>
                    <SkillForm
                      skill={skill}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
                    />
                  </MyModal>
                )}
                {deleteSkillIndex === index && (
                  <MyModal
                    showModal={true}
                    title='Usuwanie umiejętności'
                    danger={true}
                  >
                    <CandidateInfoDelete
                      name='tę umiejętność'
                      id={skill.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteSkill}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowa umiejętność'>
          <SkillForm type='create' handleCloseModal={handleCloseAddModal} />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};

export default CandidateSkill;

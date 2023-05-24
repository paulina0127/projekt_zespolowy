import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdContentPasteSearch } from 'react-icons/md';
import { MyModal, Loader, Message } from '../basics';
import { getCandidateFiles } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import CandidateTable from './CandidateTable';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import AttachmentForm from './AttachmentForm';
import CandidateInfoDelete from './CandidateInfoDelete';

const Attachement = () => {
  const profile = useSelector((state) => state.auth.user?.profile?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFileIndex, setEditFileIndex] = useState(null);
  const [deleteFileIndex, setDeleteFileIndex] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditFileIndex(index);
  const handleCloseEditModal = () => setEditFileIndex(null);

  const handleShowDeleteModal = (index) => setDeleteFileIndex(index);
  const handleCloseDeleteModal = () => setDeleteFileIndex(null);

  const dispatch = useDispatch();

  const handleDeleteFile = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'files'));
    setDeleteFileIndex(null);
  };

  const files = useSelector((state) => state.userProfileDetails.filesList);

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  useEffect(() => {
    dispatch(getCandidateFiles(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = ['Rodzaj', 'Nazwa', 'Akcje'];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje dokumenty'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            files?.results.map((file, index) => (
              <tr key={file.id}>
                <td>{file.type}</td>
                <td>{file.name}</td>
                <td>
                  <Link to={file.path} target='_blank'>
                    <MdContentPasteSearch />
                  </Link>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editFileIndex === index && (
                  <MyModal showModal={true} title='Edytowanie pliku'>
                    <AttachmentForm
                      file={file}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
                      profile={profile}
                    />
                  </MyModal>
                )}
                {deleteFileIndex === index && (
                  <MyModal
                    showModal={true}
                    title='Usuwanie pliku'
                    danger={true}
                  >
                    <CandidateInfoDelete
                      name='ten plik'
                      id={file.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteFile}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
        {loading && <Loader />}
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowy plik'>
          <AttachmentForm
            type='create'
            handleCloseModal={handleCloseAddModal}
            profile={profile}
          />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};

export default Attachement;

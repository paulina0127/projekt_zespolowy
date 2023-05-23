import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { MdEdit, MdDelete } from 'react-icons/md';
import { getCandidateLinks } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { MyModal, Loader, Message } from '../basics';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import LinkForm from './LinkForm';
import CandidateTable from './CandidateTable';
import CandidateInfoDelete from './CandidateInfoDelete';
import UserPanelLayout from '../../hocs/UserPanelLayout';

const CandidateLinks = () => {
  const profile = useSelector((state) => state.auth.user?.profile?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editLinkIndex, setEditLinkIndex] = useState(null);
  const [deleteLinkIndex, setDeleteLinkIndex] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditLinkIndex(index);
  const handleCloseEditModal = () => setEditLinkIndex(null);

  const handleShowDeleteModal = (index) => setDeleteLinkIndex(index);
  const handleCloseDeleteModal = () => setDeleteLinkIndex(null);

  const handleDeleteLink = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'links'));
    setDeleteLinkIndex(null);
  };

  const linkList = useSelector((state) => state.userProfileDetails.linkList);

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidateLinks(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = ['Rodzaj', 'Adres URL', 'Akcje'];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje linki'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            linkList &&
            linkList.results.map((link, index) => (
              <tr key={link.id}>
                <td>{link.type}</td>
                <td>
                  <Link to={link.url} target='_blank'>
                    {link.url}
                  </Link>
                </td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editLinkIndex === index && (
                  <MyModal showModal={true} title='Edytowanie linku'>
                    <LinkForm
                      link={link}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
                    />
                  </MyModal>
                )}
                {deleteLinkIndex === index && (
                  <MyModal
                    showModal={true}
                    title='Usuwanie linku'
                    danger={true}
                  >
                    <CandidateInfoDelete
                      name='ten link'
                      id={link.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteLink}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
        {loading && <Loader />}
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowy link'>
          <LinkForm type='create' handleCloseModal={handleCloseAddModal} />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};
export default CandidateLinks;

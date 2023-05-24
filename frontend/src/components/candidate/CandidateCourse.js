import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { getCandidateCourses } from '../../actions/userActions';
import { deleteCandidateComponent } from '../../actions/candidateActions';
import { MyModal, Loader, Message } from '../basics';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';
import CourseForm from './CourseForm';
import CandidateTable from './CandidateTable';
import CandidateInfoDelete from './CandidateInfoDelete';
import UserPanelLayout from '../../hocs/UserPanelLayout';

const CandidateCourse = () => {
  const profile = useSelector((state) => state.auth.user?.profile?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCourseIndex, setEditCourseIndex] = useState(null);
  const [deleteCourseIndex, setDeleteCourseIndex] = useState(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (index) => setEditCourseIndex(index);
  const handleCloseEditModal = () => setEditCourseIndex(null);

  const handleShowDeleteModal = (index) => setDeleteCourseIndex(index);
  const handleCloseDeleteModal = () => setDeleteCourseIndex(null);

  const handleDeleteCourse = (id) => {
    dispatch(deleteCandidateComponent(profile, id, 'skills'));
    setDeleteCourseIndex(null);
  };

  const courseList = useSelector(
    (state) => state.userProfileDetails.courseList
  );

  const candidateAction = useSelector((state) => state.candidate);
  const { error, success, loading } = candidateAction;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCandidateCourses(profile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, [dispatch, success, profile]);

  const th_list = [
    'Nazwa',
    'Opis',
    'Data rozpoczęcia',
    'Data zakończenia',
    'Akcje',
  ];

  return (
    <UserPanelLayout>
      <div className='container mt-3'>
        {error && <Message variant='danger'>{error}</Message>}
        <CandidateTable
          title='Moje kursy'
          handleShowAddModal={handleShowAddModal}
          th_list={th_list}
        >
          {!loading &&
            courseList &&
            courseList.results.map((course, index) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.description ? course.description : ''}</td>
                <td>{course.start_date}</td>
                <td>{course.end_date}</td>
                <td>
                  <span onClick={() => handleShowEditModal(index)}>
                    <MdEdit color='#00BE75' />
                  </span>
                  <span onClick={() => handleShowDeleteModal(index)}>
                    <MdDelete color='#DA4753' />
                  </span>
                </td>
                {editCourseIndex === index && (
                  <MyModal showModal={true} title='Edytowanie kursu'>
                    <CourseForm
                      course={course}
                      type='update'
                      handleCloseModal={handleCloseEditModal}
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
                      id={course.id}
                      handleCloseModal={handleCloseDeleteModal}
                      handleDelete={handleDeleteCourse}
                    />
                  </MyModal>
                )}
              </tr>
            ))}
        </CandidateTable>
        {loading && <Loader />}
      </div>
      {showAddModal && (
        <MyModal showModal={showAddModal} title='Nowy kurs'>
          <CourseForm type='create' handleCloseModal={handleCloseAddModal} />
        </MyModal>
      )}
    </UserPanelLayout>
  );
};

export default CandidateCourse;

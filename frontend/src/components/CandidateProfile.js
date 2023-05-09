import { useSelector } from 'react-redux';
import CandidateProfileCreate from './CandidateProfileCreate';
import CandidateProfileUpdate from './CandidateProfileUpdate';
import CandidateProfileDelete from './CandidateProfileDelete';
import UserPanelLayout from '../hocs/UserPanelLayout';

const CandidateProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <UserPanelLayout>
      {user.profile === null ? (
        <CandidateProfileCreate userId={user.id} />
      ) : (
        <>
          <CandidateProfileUpdate userProfile={user.profile} />
          <CandidateProfileDelete />
        </>
      )}
    </UserPanelLayout>
  );
};

export default CandidateProfile;

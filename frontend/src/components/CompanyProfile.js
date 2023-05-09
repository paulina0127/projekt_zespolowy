import { useSelector } from 'react-redux';
import CompanyProfileCreate from './CompanyProfileCreate';
import CompanyProfileUpdate from './CompanyProfileUpdate';
import CompanyProfileDelete from './CompanyProfileDelete';
import UserPanelLayout from '../hocs/UserPanelLayout';

const CompanyProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <UserPanelLayout>
      {user.profile === null ? (
        <CompanyProfileCreate userId={user.id} />
      ) : (
        <>
          <CompanyProfileUpdate userProfile={user.profile} />
          <CompanyProfileDelete />
        </>
      )}
    </UserPanelLayout>
  );
};

export default CompanyProfile;

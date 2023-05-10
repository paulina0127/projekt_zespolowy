import { useSelector } from 'react-redux';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import CompanyProfileCreate from './CompanyProfileCreate';
import CompanyProfileDelete from './CompanyProfileDelete';
import CompanyProfileUpdate from './CompanyProfileUpdate';

const CompanyProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <UserPanelLayout>
      {user?.profile === null ? (
        <CompanyProfileCreate userId={user.id} />
      ) : (
        <>
          <CompanyProfileUpdate userProfile={user?.profile.id} />
          <CompanyProfileDelete />
        </>
      )}
    </UserPanelLayout>
  );
};

export default CompanyProfile;

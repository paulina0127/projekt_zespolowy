import { useSelector } from 'react-redux';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import CompanyProfileCreate from './CompanyProfileCreate';
import CompanyProfileUpdate from './CompanyProfileUpdate';
import { DeleteProfile } from '../accountSettings';

const CompanyProfile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <UserPanelLayout>
      {user?.profile === null ? (
        <CompanyProfileCreate userId={user.id} />
      ) : (
        <>
          <CompanyProfileUpdate userProfile={user?.profile?.id} />
          <DeleteProfile userProfile={user?.profile?.id} />
        </>
      )}
    </UserPanelLayout>
  );
};

export default CompanyProfile;

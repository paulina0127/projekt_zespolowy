import { useSelector } from 'react-redux'
import CompanyProfileCreate from './CompanyProfileCreate'
import CompanyProfileUpdate from './CompanyProfileUpdate'
import CompanyProfileDelete from './CompanyProfileDelete'

const CompanyProfile = () => {
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  return (
    <>
      {user.profile === null ? (
        <CompanyProfileCreate userId={user.id} />
      ) : (
        <>
          <CompanyProfileUpdate userProfile={user.profile} />
          <CompanyProfileDelete />
        </>
      )}
    </>
  )
}

export default CompanyProfile

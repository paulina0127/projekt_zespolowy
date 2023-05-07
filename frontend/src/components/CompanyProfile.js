import { useSelector } from 'react-redux'
import CompanyProfileCreate from './CompanyProfileCreate'
import CompanyProfileUpdate from './CompanyProfileUpdate'

const CompanyProfile = () => {
  const auth = useSelector(state => state.auth)
  const { user } = auth
  return (
    <>
      {user.profile === null ? <CompanyProfileCreate userId={user.id}/> 
      : <CompanyProfileUpdate userProfile={user.profile}/>}
    </>
  )
}

export default CompanyProfile
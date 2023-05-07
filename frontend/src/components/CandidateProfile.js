import { useSelector } from 'react-redux'
import CandidateProfileCreate from './CandidateProfileCreate'
import CandidateProfileUpdate from './CandidateProfileUpdate'
import CandidateProfileDelete from './CandidateProfileDelete'

const CandidateProfile = () => {
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  return (
    <>
      {user.profile === null ? (
        <CandidateProfileCreate userId={user.id} />
      ) : (
        <>
          <CandidateProfileUpdate userProfile={user.profile} />
          <CandidateProfileDelete />
        </>
      )}
    </>
  )
}

export default CandidateProfile

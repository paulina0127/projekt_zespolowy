import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ApplicationItem from './ApplicationItem'
import { APPLICATION_LIST_CLEAR } from '../../constants/applicationConst'
import { listApplications } from '../../actions/applicationActions'
import { Loader, Message } from '../basics'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../company/CompanyProfileForm.module.css'

const CandidateApplications = () => {

  const { applications, loading, error } = useSelector(state => state.application)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listApplications())
    return () => {
      dispatch({ type: APPLICATION_LIST_CLEAR })
    }
  }, [])

  return (
    <UserPanelLayout>
      <div>
        <h2 className={styles['profile-h2']}>Wysłane aplikacje</h2>
        { loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          : applications.length === 0 ? <Message variant='primary'>Brak aplikacji</Message>
          :
          <div className='container'>
            {applications.map((application, index) =>
              <ApplicationItem application={application} key={application.id}/>
            )}
          </div>
        }
      </div>
    </UserPanelLayout>
  )
}
export default CandidateApplications

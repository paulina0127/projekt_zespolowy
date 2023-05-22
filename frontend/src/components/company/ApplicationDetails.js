import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../../screens/MainPanelScreen.module.css'
import { BiArrowBack } from 'react-icons/bi'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  listApplicationDetails,
  updateApplication,
} from '../../actions/applicationActions'
import { APPLICATION_DETAILS_CLEAR } from '../../constants/applicationConst'
import { useState, useEffect, Fragment } from 'react'
import { Loader, Message, MyModal } from '../../components/basics'
import {
  ReceivedApplicationItem,
  ApplicationEvaluationForm,
  CompanyApplicationInfo,
} from '.'
import {
  Experience,
  Education,
  Skill,
  Course,
  CLink,
  Attachment,
} from './ApplicationDetailsItems'

const ApplicationDetails = () => {
  const [changeAppStatus, setAppStatus] = useState(false)
  const [statusType, setStatusType] = useState('')
  const application_id = useParams().id

  const dispatch = useDispatch()

  const { application, loading, error } = useSelector(
    (state) => state.applicationDetails
  )

  const { loadingUpdate, successUpdate, errorUpdate } = useSelector(
    (state) => state.applicationChanges
  )

  const handleShowModal = (type) => {
    setAppStatus(true)
    setStatusType(type)
  }

  const handleCloseModal = () => setAppStatus(false)

  const handleChageStatusApplication = (id, type) => {
    const value = { status: '' }
    if (type === 'accept') {
      value.status = 'Zaakceptowana'
    } else if (type === 'reject') {
      value.status = 'Odrzucona'
    }
    dispatch(updateApplication(id, value))
    setAppStatus(false)
  }

  useEffect(() => {
    dispatch(listApplicationDetails(application_id))
    return () => {
      dispatch({ type: APPLICATION_DETAILS_CLEAR })
    }
  }, [successUpdate])

  return (
    <UserPanelLayout>
      <div className='container justify-content-center px-4 py-5 my-3'>
        <Link to={'/user-panel/aplikacje'}>
          <button className='btn btn-dark rounded-pill mb-3'>
            <BiArrowBack /> Wróć
          </button>
        </Link>
        <h2 className={styles['panel-h2']}>Szczegóły aplikacji</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : Object.keys(application).length === 0 ? null : (
          <div className='shadow p-3 bg-white rounded-5 m-2'>
            <Fragment key={application.id}>
              <ReceivedApplicationItem
                application={application}
                handleShowModal={handleShowModal}
              />
              {changeAppStatus && (
                <MyModal
                  showModal={true}
                  title={
                    statusType === 'accept'
                      ? 'Akceptowanie aplikacji'
                      : 'Odrzucanie aplikacji'
                  } 
                  danger={statusType === 'reject' ? true : 'accept'}
                >
                  <CompanyApplicationInfo
                    type={statusType}
                    name='tę aplikację'
                    handleCloseModal={handleCloseModal}
                    handleChangeStatus={handleChageStatusApplication}
                    id={application.id}
                  />
                </MyModal>
              )}
            </Fragment>
            <div className='d-grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className='d-flex flex-column p-4'>
                <h4 className={styles['panel-h4']}>Dane osobowe</h4>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Imię i nazwisko</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.first_name} ${application.candidate.last_name}`}</p>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Adres zamieszkania</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.location.street_address}, ${application.candidate.location.postal_code}  ${application.candidate.location.city}`}</p>
                </div>
                <div className='d-flex flex-column'>
                  <h5 className={styles['panel-h5']}>Numer telefonu</h5>
                  <p
                    className={styles['panel-p']}
                  >{`${application.candidate.phone_number}`}</p>
                </div>
              </div>
              <div className='d-flex flex-column p-4'>
                <h4 className={styles['panel-h4']}>Ocena kandydata</h4>

                <ApplicationEvaluationForm application={application} />
              </div>
            </div>
            {application.type === 'Profil kandydata' ? (
              <>
                {application.candidate?.experience?.length > 0 && (
                  <div className='d-flex flex-column px-4 py-2'>
                    <h4 className={styles['panel-h4']}>Doświadczenie</h4>
                    {application.candidate?.experience
                      ?.sort((a, b) => {
                        if (!a.end_date && !b.end_date) {
                          return 0 // Both offers have no end date, maintain their original order
                        } else if (!a.end_date) {
                          return -1 // Offer 'a' has no end date, so it should be on top
                        } else if (!b.end_date) {
                          return 1 // Offer 'b' has no end date, so it should be on top
                        } else {
                          return new Date(b.end_date) - new Date(a.end_date) // Compare based on end dates
                        }
                      })
                      .map((exp) => (
                        <Experience experience={exp} />
                      ))}
                  </div>
                )}
                {application.candidate?.education?.length > 0 && (
                  <div className='d-flex flex-column px-4 py-2'>
                    <h4 className={styles['panel-h4']}>Wykształcenie</h4>
                    {application.candidate?.education
                      ?.sort((a, b) => {
                        if (!a.end_date && !b.end_date) {
                          return 0 // Both items have no end date, maintain their original order
                        } else if (!a.end_date) {
                          return -1 // Item 'a' has no end date, so it should be on top
                        } else if (!b.end_date) {
                          return 1 // Item'b' has no end date, so it should be on top
                        } else {
                          return new Date(b.end_date) - new Date(a.end_date) // Compare based on end dates
                        }
                      })
                      .map((edu) => (
                        <Education education={edu} />
                      ))}
                  </div>
                )}
                {application.candidate?.skills?.length > 0 && (
                  <div className='d-flex flex-column px-4 py-2'>
                    <h4 className={styles['panel-h4']}>Umiejętności</h4>
                    {application.candidate?.skills?.filter(
                      (skill) => skill.type === 'Umiejętność twarda'
                    ).length > 0 && (
                      <>
                        <h5 className={styles['panel-h5']}>
                          Umiejętności twarde
                        </h5>
                        <ul>
                          {application.candidate?.skills
                            ?.filter(
                              (skill) => skill.type === 'Umiejętność twarda'
                            )
                            .map((skill) => (
                              <Skill skill={skill} />
                            ))}
                        </ul>
                        <hr></hr>
                      </>
                    )}

                    {application.candidate?.skills?.filter(
                      (skill) => skill.type === 'Umiejętność miękka'
                    ).length > 0 && (
                      <>
                        <h5 className={styles['panel-h5']}>
                          Umiejętności miękkie
                        </h5>
                        <ul>
                          {application.candidate?.skills
                            ?.filter(
                              (skill) => skill.type === 'Umiejętność miękka'
                            )
                            .map((skill) => (
                              <Skill skill={skill} />
                            ))}
                        </ul>
                        <hr></hr>
                      </>
                    )}
                    {application.candidate?.skills?.filter(
                      (skill) => skill.type === 'Język'
                    ).length > 0 && (
                      <>
                        <h5 className={styles['panel-h5']}>Języki</h5>
                        <ul>
                          {application.candidate?.skills
                            ?.filter((skill) => skill.type === 'Język')
                            .map((skill) => (
                              <Skill skill={skill} />
                            ))}
                        </ul>
                        <hr></hr>
                      </>
                    )}

                    {application.candidate?.skills?.filter(
                      (skill) => skill.type === 'Inny'
                    ).length > 0 && (
                      <>
                        <h5 className={styles['panel-h5']}>Inne</h5>
                        <ul>
                          {application.candidate?.skills
                            ?.filter((skill) => skill.type === 'Inny')
                            .map((skill) => (
                              <Skill skill={skill} />
                            ))}
                        </ul>
                        <hr></hr>
                      </>
                    )}
                  </div>
                )}

                {application.candidate?.courses?.length > 0 && (
                  <div className='d-flex flex-column px-4 py-2'>
                    <h4 className={styles['panel-h4']}>Kursy</h4>
                    {application.candidate.courses
                      .sort(
                        (a, b) => new Date(b.end_date) - new Date(a.end_date)
                      )
                      .map((course) => (
                        <Course course={course} />
                      ))}
                  </div>
                )}
                {application.candidate?.links?.length > 0 && (
                  <div className='d-flex flex-column px-4 py-2'>
                    <h4 className={styles['panel-h4']}>Linki</h4>
                    <ul>
                      {application.candidate.links.map((link) => (
                        <CLink link={link} />
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                {application.attachments?.length > 0 && (
                  <>
                    <hr></hr>
                    <div className='d-flex flex-column px-4 py-2'>
                      <h4 className={styles['panel-h4']}>Załączniki</h4>
                      <ul>
                        {application.attachments.map((attachment) => (
                          <Attachment attachment={attachment} />
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </UserPanelLayout>
  )
}

export default ApplicationDetails

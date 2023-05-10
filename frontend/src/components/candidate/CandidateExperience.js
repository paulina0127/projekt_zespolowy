import { useSelector } from 'react-redux';
import ExperienceForm from './ExperienceForm';
import styles from '../company/CompanyProfileForm.module.css';

const CandidateExperience = () => {
  const experienceList = useSelector(
    (state) => state.userProfileDetails.experienceList
  );

  return (
    <div>
      <h2 className={styles['profile-h2']}>Doświadczenie</h2>
      <div className='d-flex flex-row justify-content-around'>
        {experienceList && experienceList.results ? (
          <ul className='col-12'>
            {experienceList.results.map((experience) => (
              <li key={experience.id}>
                <h4>{experience.position}</h4>
                <strong>{experience.company}</strong>
                <p>
                  {experience.start_date} - {experience.end_date}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <h2>Nowe doświadczenie:</h2>
      <ExperienceForm type='create' label='Dodaj nowe doświadczenie' />
    </div>
  );
};

export default CandidateExperience;

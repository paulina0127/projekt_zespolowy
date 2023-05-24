import { Link } from 'react-router-dom';
import styles from '../../screens/MainPanelScreen.module.css';
import { HiSearch } from 'react-icons/hi';

export const Experience = ({ experience }) => {
  return (
    <div className='d-flex flex-column py-2'>
      <p className={styles['panel-p2']}>{`${experience.start_date} - ${
        experience.end_date ? experience.end_date : 'obecnie'
      }`}</p>
      <h5 className={styles['panel-h5']}>
        {experience.location
          ? `${experience.position} | ${experience.company} | ${experience.location?.city}`
          : `${experience.position} | ${experience.company}`}
      </h5>
      <p className={styles['panel-p']}>Obowiązki</p>
      <ul>
        {experience.duties.map((duty) => (
          <li>{duty}</li>
        ))}
      </ul>
      {experience.references && (
        <>
          <p
            className={styles['panel-p']}
            style={{ color: 'var(--dark-yellow)', fontWeight: 'bold' }}
          >
            Referencje
            <Link to={experience.references.path} target='_blank'>
              <button
                type='button'
                title='Referencje'
                className={`btn btn-secondary rounded-circle mx-1 ${styles.circleBtn}`}
              >
                <HiSearch />
              </button>
            </Link>
          </p>
        </>
      )}
      <hr></hr>
    </div>
  );
};

export const Education = ({ education }) => {
  return (
    <div className='d-flex flex-column py-2'>
      <p className={styles['panel-p2']}>{`${education.start_date} - ${
        education.end_date ? education.end_date : 'obecnie'
      }`}</p>
      <h5 className={styles['panel-h5']}>{education.institute}</h5>
      {education.major && (
        <p className={styles['panel-p']}>Kierunek: {education.major}</p>
      )}
      <p className={styles['panel-p']}>
        Poziom wykształcenia: {education.education_level}
      </p>
      {education.diploma && (
        <>
          <p
            className={styles['panel-p']}
            style={{ color: 'var(--dark-yellow)', fontWeight: 'bold' }}
          >
            Dyplom
            <Link to={education.diploma.path} target='_blank'>
              <button
                type='button'
                title='Dyplom'
                className={`btn btn-secondary rounded-circle mx-2 ${styles.circleBtn}`}
              >
                <HiSearch />
              </button>
            </Link>
          </p>
        </>
      )}
      <hr></hr>
    </div>
  );
};

export const Skill = ({ skill }) => {
  return (
    <li>
      <p className={styles['panel-p2']}>
        {' '}
        {skill.level ? `${skill.name}, poziom ${skill.level}` : `${skill.name}`}
      </p>
      {skill.certificate && (
        <>
          <p
            className={styles['panel-p']}
            style={{ color: 'var(--dark-yellow)', fontWeight: 'bold' }}
          >
            Certyfikat
            <Link to={skill.certificate.path} target='_blank'>
              <button
                type='button'
                title='Certyfikat'
                className={`btn btn-secondary rounded-circle mx-2 ${styles.circleBtn}`}
              >
                <HiSearch />
              </button>
            </Link>
          </p>
        </>
      )}
    </li>
  );
};

export const Course = ({ course }) => {
  return (
    <div className='d-flex flex-column py-2'>
      <p
        className={styles['panel-p2']}
      >{`${course.start_date} - ${course.end_date}`}</p>
      <h5 className={styles['panel-h5']}>{course.name}</h5>
      {course.description && (
        <p className={styles['panel-p']}>{course.description}</p>
      )}
      {course.certificate && (
        <>
          <p
            className={styles['panel-p']}
            style={{ color: 'var(--dark-yellow)', fontWeight: 'bold' }}
          >
            Certyfikat
            <Link to={course.certificate.path} target='_blank'>
              <button
                type='button'
                title='Certyfikat'
                className={`btn btn-secondary rounded-circle mx-2 ${styles.circleBtn}`}
              >
                <HiSearch />
              </button>
            </Link>
          </p>
        </>
      )}
      <hr></hr>
    </div>
  );
};

export const CLink = ({ link }) => {
  return (
    <li>
      <p className={styles['panel-p2']}>
        <Link to={link.url} style={{ color: 'black' }}>
          {link.type}
        </Link>
      </p>
    </li>
  );
};

export const Attachment = ({ attachment }) => {
  return (
    <li>
      <p className={styles['panel-p']}>
        {attachment.file.name}
        <Link to={attachment.file.path} target='_blank'>
          <button
            type='button'
            title='Załącznik'
            className={`btn btn-secondary rounded-circle mx-2 ${styles.circleBtn}`}
          >
            <HiSearch />
          </button>
        </Link>
      </p>
    </li>
  );
};

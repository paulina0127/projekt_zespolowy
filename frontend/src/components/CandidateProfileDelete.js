import styles from './ComapnyProfileForm.module.css'

const CandidateProfileDelete = ({}) => {
  return (
    <div>
      <h2 className={styles['profile-h2']}>Usuń profil</h2>
      <div className='d-flex flex-row justify-content-around'>
        <div className={styles['white-bg']}>
          <p className={styles['profile-p']}>
            Usunięcie profilu jest nieodwracalne. Prosimy o rozważenie swojej
            decyzji.
          </p>
          <div className='d-grid col-3 mx-auto'>
            <button
              type='submit'
              className='btn btn-danger rounded-pill fw-bold shadow-sm'
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfileDelete

import { Link } from 'react-router-dom';
import styles from './HomeScreen.module.css';

const HomeScreen = () => {
  return (
    <>
      <section className={styles['hero-image']}>
        <div className={styles['hero-image-container']}>
          <div className={styles['hero-image-title']}>
            <h1>
              Znajdź swoją <br />
              wymarzoną
              <br />
              ofertę i{' '}
              <span
                style={{
                  color: 'var(--yellow)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                Aplikuj
              </span>{' '}
              z
              <br />
              nami!
            </h1>
            {/* <a href="" className={styles["hero-butt"]}>Button</a> */}
          </div>
        </div>
      </section>
      <section>
        <div className='container text-center mb-5'>
          <h1 className='text-center m-5'>Zaufaj nam, tak jak oni!</h1>
          <div className='row align-items-center justify-content-center mt-5 mb-5'>
            <div className='col-2'>
              <div className='shadow p-3  bg-white rounded-circle'>
                <img
                  className='rounded'
                  src={require('../images/mcdonalds.png')}
                  alt='WcDonalds'
                ></img>
              </div>
            </div>
            <div className='col'>
              <div className='shadow p-3 bg-white rounded-pill'>
                <p className='fw-bold'>WCDONALD'S</p>
                <p>
                  "HireMeNow jest czymś niezwykłym... Jeszcze nigdy nie
                  zatrudniliśmy tyle studentów!"
                </p>
              </div>
            </div>
          </div>
          <div className='row align-items-center justify-content-center mb-5'>
            <div className='col'>
              <div className='shadow p-3 bg-white rounded-pill'>
                <p className='fw-bold'>OOOGLE</p>
                <p>
                  "Kandydaci na HireMeNow udowodnili nam, dlaczego warto
                  rozwijać AI"
                </p>
              </div>
            </div>
            <div className='col-2'>
              <div className='shadow p-3  bg-white rounded-circle'>
                <img
                  className='rounded'
                  src={require('../images/google.png')}
                  alt='Ooogle'
                ></img>
              </div>
            </div>
          </div>
          <div className='row align-items-center justify-content-center mb-5'>
            <div className='col-2'>
              <div className='shadow p-3  bg-white rounded-circle'>
                <img
                  className='rounded-pill'
                  src={require('../images/kot.jpg')}
                  alt='Kot'
                  s
                ></img>
              </div>
            </div>
            <div className='col'>
              <div className='shadow p-3 bg-white rounded-pill'>
                <p className='fw-bold'>KOT</p>
                <p>"Wreszcie stać mojego właściciela na saszety, 10/10"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles['hero-image']}>
        <div className={styles['hero-image-cta-container']}>
          <div className={styles['hero-image-cta-title']}>
            <h1 style={{ color: 'var(--yellow)' }}>Stwórz darmowe konto</h1>
            <h1>
              I zacznij szukać swojej wymarzonej <br /> pracy już teraz!
            </h1>
            <Link to='/rejestracja'>
              <button type='button' className={styles['yellow-btn']}>
                Zarejestruj się
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='container mt-5'></div>
    </>
  );
};

export default HomeScreen;

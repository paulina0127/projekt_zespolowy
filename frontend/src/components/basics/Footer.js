import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <>
      <div className={styles['footer']}>
        <div className={styles['container']}>
          <div className='column align-items-center'>
            <h3 className={styles['footer-h3']}>Znajdź swoją wymarzoną</h3>
            <h3 className={styles['footer-h3']}>ofertę i aplikuj z nami!</h3>
          </div>
          <div className='column'>
            <h1 className={styles['footer-h1']}>Dla kandydatów</h1>
            <Link to='/rejestracja'>
              <p className={styles['footer-p']}>Zarejestruj się</p>
            </Link>
            <Link to='/oferty'>
              <p className={styles['footer-p']}>Oferty pracy</p>
            </Link>
            <Link to='/pracodawcy'>
              <p className={styles['footer-p']}>Pracodawcy</p>
            </Link>
          </div>
          <div className='column'>
            <h1 className={styles['footer-h1']}>Dla pracodawców</h1>
            <Link to='/rejestracja'>
              <p className={styles['footer-p']}>Zarejestruj się</p>
            </Link>
            <p className={styles['footer-p']}>Dodaj ofertę pracy</p>
          </div>
          <div className='column'>
            <h1 className={styles['footer-h1']}>Kontakt</h1>
            <p className={styles['footer-p']}>+48 000 000 000</p>
            <p className={styles['footer-p']}>hiremenow@gmail.com</p>
            <p className={styles['footer-p']}>Olsztyn, ul. Armii Krajowej 23</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer
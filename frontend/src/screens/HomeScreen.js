import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'
import NewApplicationForm from '../components/NewApplicationForm'

import styles from './HomeScreen.module.css'

const HomeScreen = () => {
  const [searchInput, setSearchInput] = useState('')
  const [locationInput, setLocationInput] = useState('')

  return (
    <>
      <NewApplicationForm />
      <section className={styles['hero-image']}>
        <div className={styles['hero-image-container']}>
          <div className={styles['hero-image-title']}>
            <h1>
              Znajdź swoją <br />
              wymarzoną
              <br />
              ofertę i <span style={{ color: 'var(--yellow)' }}>Aplikuj</span> z
              <br />
              nami!
            </h1>
            {/* <a href="" className={styles["hero-butt"]}>Button</a> */}
          </div>
        </div>
      </section>
      <section className={styles['search-sec']}>
        <div className='container'>
          <form>
            <div className='row align-items-center justify-content-around'>
              <div className='col-lg-12'>
                <div className='d-flex flex-row justify-content-around'>
                  <div className='col-lg-6 col-md-3 col-sm-12 p-0 mx-2'>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control rounded-pill'
                        placeholder='Zawód, firma'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-3 col-sm-12 p-0 mx-2'>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control rounded-pill'
                        placeholder='Lokalizacja'
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='col-lg-3 col-md-3 col-sm-12 p-0 mx-2 flex-fill'>
                    <button
                      type='button'
                      className='btn btn-warning rounded-pill fw-bold'
                    >
                      Wyszukaj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
              <button
                type='button'
                className='btn btn-warning rounded-pill fw-bold btn-lg'
              >
                Zarejestruj się
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='container mt-5'></div>
    </>
  )
}

export default HomeScreen

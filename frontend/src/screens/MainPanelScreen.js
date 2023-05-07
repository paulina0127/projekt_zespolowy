import { useSelector} from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import CompanyOffers from '../components/CompanyOffers';
import CompanyProfile from "../components/CompanyProfile";

import styles from './MainPanelScreen.module.css'
import { FaFile, FaPlus } from 'react-icons/fa'

const MainPanelScreen = () => {
  const { pathname } = useLocation()
  const type = useSelector((state) => state.auth.user.type)
  const isUser = useSelector((state) => state.auth.user)

  if (isUser === undefined) {
    return <Navigate replace to='/' />
  }

  return (
    <Container fluid className='main-panel'>
      <Row>
        <Sidebar />
        <Col md={10} className='content'>
          {pathname === '/user-panel/konto' && (
            <div>
              <h2>Zmień email</h2>
              <div className={styles['white-bg']}>
                <form>
                  <div className='container p-5'>
                    <div className='row align-items-center justify-content-evenly me-auto'>
                      <div className='col'>
                        <div className={styles['logo-title']}>Logo firmy</div>
                        <button className={styles['logo-btn']}>
                          <FaPlus size='5em' color='#242424' />
                        </button>
                      </div>
                      <div className='col col-6'>
                        <h4>Email</h4>
                        <input
                          type='text'
                          className='form-control rounded-pill'
                        />
                      </div>
                    </div>
                  </div>
                  <div class='d-grid col-2 mx-auto'>
                    <button
                      type='submit'
                      className='btn btn-warning rounded-pill fw-bold text-uppercase shadow-sm '
                    >
                      Zapisz
                    </button>
                  </div>
                </form>
              </div>
              <h2>Zmień hasło</h2>
              <div className={styles['white-bg']}>
                <form>
                  <div className='container p-5'>
                    <div className='row align-items-center justify-content-evenly me-auto'>
                      <div className='col'>
                        <div className={styles['logo-title']}>Logo firmy</div>
                        <button className={styles['logo-btn']}>
                          <FaPlus size='5em' color='#242424' />
                        </button>
                      </div>
                      <div className='col col-4'>
                        <h4>Aktualne hasło</h4>
                        <input
                          type='text'
                          className='form-control rounded-pill'
                        />
                      </div>
                      <div className='col col-4'>
                        <h4>Nowe hasło</h4>
                        <input
                          type='text'
                          className='form-control rounded-pill'
                        />
                      </div>
                    </div>
                  </div>
                  <div class='d-grid col-2 mx-auto'>
                    <button
                      type='submit'
                      className='btn btn-warning rounded-pill fw-bold text-uppercase shadow-sm '
                    >
                      Zapisz
                    </button>
                  </div>
                </form>
              </div>

              <h2>Usuń profil</h2>
              <div className='d-flex flex-row justify-content-around'>
                <div className={styles['white-bg']}>
                  <p>
                    Usunięcie profilu jest nieodwracalne. Prosimy o rozważenie
                    swojej decyzji.
                  </p>
                  <div class='d-grid col-2 mx-auto'>
                    <button
                      type='submit'
                      className='btn btn-danger rounded-pill fw-bold text-uppercase shadow-sm '
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {pathname === '/user-panel/profil' && (
            //profil kandydata
            <div>
              {type === 'Kandydat' && (
                <section>
                  <h2>Dane osobowe</h2>
                  <div className={styles['white-bg']}>
                    <form>
                      <div className='container p-5'>
                        <div className='d-flex row justify-content-evenly '>
                          <div className='col col-4 align-self-center'>
                            <div className={styles['logo-title']}>
                              Logo firmy
                            </div>
                            <div>
                              <button className={styles['logo-btn']}>
                                <FaPlus size='5em' color='#242424' />
                              </button>
                            </div>
                          </div>
                          <div className='col col-4'>
                            <h4>Imię</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Nazwisko</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Email</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Telefon</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Pesel</h4>
                            <input
                              type='text'
                              className='form-control input-lg rounded-pill'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='d-grid col-3 mx-auto'>
                        <button
                          type='submit'
                          className='btn btn-warning rounded-pill fw-bold text-uppercase shadow-sm '
                        >
                          Zapisz
                        </button>
                      </div>
                    </form>
                  </div>
                  <h2>Usuń profil</h2>
                  <div className='d-flex flex-row justify-content-around'>
                    <div className={styles['white-bg']}>
                      <p>
                        Usunięcie profilu jest nieodwracalne. Prosimy o
                        rozważenie swojej decyzji.
                      </p>
                      <div class='d-grid col-3 mx-auto'>
                        <button
                          type='submit'
                          className='btn btn-danger rounded-pill fw-bold text-uppercase shadow-sm '
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
          {pathname === '/user-panel/moje-aplikacje' && (
            <h2>Ekran moich aplikacji</h2>
            // Tutaj umieść kod dla zawartości ekranu moich aplikacji
          )}
          {pathname === '/user-panel/dokumenty' && (
            <div>
              <h2>Dokumenty</h2>
              <div className='d-flex flex-row'>
                <button className={styles['doc-btn']}>
                  <FaFile size='5em' color='#242424' />
                </button>
                <button className={styles['doc-btn']}>
                  <FaPlus size='5em' color='#242424' />
                </button>
              </div>
            </div>
          )}
          {pathname === '/user-panel/profil' && (
            //profil pracodawcy
            <div>
              {type === 'Pracodawca' && (
                <section>
                  <h2>Profil pracodawcy</h2>
                  <div className={styles['white-bg']}>
                    <form>
                      <div className='container p-5'>
                        <div className='row align-items-center justify-content-evenly me-auto'>
                          <div className='col'>
                            <div className={styles['logo-title']}>
                              Logo firmy
                            </div>
                            <button className={styles['logo-btn']}>
                              <FaPlus size='5em' color='#242424' />
                            </button>
                          </div>
                          <div className='col'>
                            <h4>Nazwa firmy</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Opis firmy</h4>
                            <div className='input-group input-group-lg'>
                              <input
                                type='text'
                                className='form-control input-lg rounded-pill'
                              />
                            </div>
                            <h4>Lokalizacja</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                          </div>
                          <div className='col'>
                            <h4>NIP firmy</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                            <h4>Co oferujemy</h4>
                            <div className='input-group input-group-lg'>
                              <input
                                type='text'
                                className='form-control input-lg rounded-pill'
                              />
                            </div>
                            <h4>Kontakt</h4>
                            <input
                              type='text'
                              className='form-control rounded-pill'
                            />
                          </div>
                        </div>
                      </div>
                      <div class='d-grid col-3 mx-auto'>
                        <button
                          type='submit'
                          className='btn btn-warning rounded-pill fw-bold text-uppercase shadow-sm '
                        >
                          Zapisz
                        </button>
                      </div>
                    </form>
                  </div>
                  <h2>Usuń profil</h2>
                  <div className='d-flex flex-row justify-content-around'>
                    <div className={styles['white-bg']}>
                      <p>
                        Usunięcie profilu jest nieodwracalne. Prosimy o
                        rozważenie swojej decyzji.
                      </p>
                      <div class='d-grid col-3 mx-auto'>
                        <button
                          type='submit'
                          className='btn btn-danger rounded-pill fw-bold text-uppercase shadow-sm '
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
          {pathname === '/user-panel/moje-oferty' && <CompanyOffers />}
          {pathname === '/user-panel/konwersacje' && <h2>Konwersacje</h2>}
          {pathname === '/user-panel/aplikacje' && <h2>Ekran aplikacji</h2>}
          {pathname === '/user-panel/' && <h2>Ekran aplikacji</h2>}
        </Col>
      </Row>
    </Container>
  )
}

export default MainPanelScreen

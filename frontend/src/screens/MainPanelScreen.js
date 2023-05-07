import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'
import CompanyOffers from '../components/CompanyOffers'
import CompanyProfile from '../components/CompanyProfile'
import CandidateProfile from '../components/CandidateProfile'
import CandidateProfileForm from '../components/CandidateProfileForm'

import styles from './MainPanelScreen.module.css'
import ReceivedApplication from '../components/ReceivedApplication'
import AccountManagement from '../components/AccountManagement'
import Attachement from '../components/Attachement'

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
          {/* Zarządzanie kontem */}
          {pathname === '/user-panel/konto' && <AccountManagement />}
          {/* Profil kandydata*/}
          {pathname === '/user-panel/profil' && type === 'Kandydat' && (
            <CandidateProfile />
          )}
          {/* Aplikacje kandydata */}
          {pathname === '/user-panel/moje-aplikacje' && (
            <h2 className={styles['panel-h2']}>Ekran moich aplikacji</h2>
            // Tutaj umieść kod dla zawartości ekranu moich aplikacji
          )}
          {/* Zarządzanie załącznikami */}
          {pathname === '/user-panel/dokumenty' && <Attachement />}
          {pathname === '/user-panel/profil' && type === 'Pracodawca' && (
            <CompanyProfile />
          )}
          {pathname === '/user-panel/moje-oferty' && <CompanyOffers />}
          {/* Czat */}
          {pathname === '/user-panel/konwersacje' && (
            <h2 className={styles['panel-h2']}>Konwersacje</h2>
          )}
          {/* Aplikacje pracodawcy */}
          {pathname === '/user-panel/aplikacje' && <ReceivedApplication />}
          {pathname === '/user-panel/' && <h2>Ekran aplikacji</h2>}
        </Col>
      </Row>
    </Container>
  )
}

export default MainPanelScreen

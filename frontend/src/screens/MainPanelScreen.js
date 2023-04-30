import { useSelector} from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import CompanyOffers from '../components/CompanyOffers';

const MainPanelScreen = () => {
  const { pathname } = useLocation();

  const isUser = useSelector(state => state.auth.user);  

  if(isUser === undefined) {
    return <Navigate replace to="/" />;
  }

  return (
    <Container fluid className="main-panel">
      <Row>
        <Sidebar />
        <Col md={10} className="content">
          {pathname === '/user-panel/profil' && (
            <h2>Ekran profilu użytkownika</h2>
            // Tutaj umieść kod dla zawartości ekranu profilu użytkownika
          )}
          {pathname === '/user-panel/moje-aplikacje' && (
            <h2>Ekran moich aplikacji</h2>
            // Tutaj umieść kod dla zawartości ekranu moich aplikacji
          )}
          {pathname === '/user-panel/moje-oferty' && <CompanyOffers />}
          {pathname === '/user-panel/aplikacje' && (
            <h2>Ekran aplikacji</h2>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainPanelScreen;
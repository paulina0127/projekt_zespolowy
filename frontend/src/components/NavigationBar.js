import { Navbar, Nav, NavDropdown, Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

import { IoIosArrowDropdown} from 'react-icons/io';
import ProfilePic from '../images/profile_pic.jpg';
import Brand from '../images/brand.png';
import styles from './NavigationBar.module.css'

const NavigationBar = ( { logout, isAuthenticated } ) => {

  const guestLinks = () => (
    <>
      <Nav.Link as={Link} to="/logowanie">
        <Button className="rounded-pill" variant="warning">Zaloguj się</Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/rejestracja">
        <Button className="rounded-pill" variant="outline-warning">Zarejestruj się</Button>
      </Nav.Link>
    </>
  );

  const authLinks = () => (
    <>
    <NavDropdown 
      className = {styles['dropdown-toggle']}
      title={
          <div className="pull-right">
              <Image
                style={{ width: '40px', marginRight: '10px' }}
                src={ProfilePic} 
                alt="user pic"
                roundedCircle
              />
              Moje Konto <IoIosArrowDropdown />
          </div>
      } 
      id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/user-panel">Profil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>
          Wyloguj się
        </NavDropdown.Item>
    </NavDropdown>
    </>
  );

  return (
    <Navbar collapseOnSelect expand="lg" className={styles.nav} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
              alt="brand pic"
              src={Brand}
              width="150"
              height="30"
            />
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link className={styles.link} as={Link} to="/oferty">Oferty Pracy</Nav.Link>
            <Nav.Link className={styles.link} as={Link} to="/pracodawcy">Pracodawcy</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? authLinks() : guestLinks() }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);

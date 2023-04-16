import { Navbar, Nav, NavDropdown, Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

import { IoIosArrowDropdown} from 'react-icons/io';
import ProfilePic from '../images/profile_pic.jpg';
import styles from './NavigationBar.module.css'

const NavigationBar = ( { logout, isAuthenticated } ) => {

  const guestLinks = () => (
    <>
      <Nav.Link as={Link} to="/logowanie">
        <Button variant="warning">Zaloguj się</Button>
      </Nav.Link>
      <Nav.Link as={Link} to="/rejestracja">
        <Button variant="outline-warning">Zarejestruj się</Button>
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
              Jan Kowalski <IoIosArrowDropdown />
          </div>
      } 
      id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/profil">Profil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>
          Wyloguj się
        </NavDropdown.Item>
    </NavDropdown>
    </>
  );

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* <img
              alt=""
              src=""
              width="10"
              height="30"
              className="d-inline-block align-top"
            /> */}
          HireMeNow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/oferty">Oferty Pracy</Nav.Link>
            <Nav.Link as={Link} to="/pracodawcy">Pracodawcy</Nav.Link>
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

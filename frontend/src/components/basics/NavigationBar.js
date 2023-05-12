import {
  Button,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/authActions'
import { FaPowerOff } from 'react-icons/fa'
import { IoIosArrowDropdown } from 'react-icons/io'
import placeholder from '../../images/placeholder.png'
import Brand from '../../images/brand.png'
import styles from './NavigationBar.module.css'

const NavigationBar = ({ logout, user }) => {
  const guestLinks = () => (
    <>
      <Nav.Link as={Link} to='/logowanie'>
        <Button className={styles['login-btn']}>Zaloguj się</Button>
      </Nav.Link>
      <Nav.Link as={Link} to='/rejestracja'>
        <Button className={styles['register-btn']}>Zarejestruj się</Button>
      </Nav.Link>
    </>
  )

  const authLinks = () => (
    <>
      <NavDropdown
        className={styles['dropdown-toggle']}
        title={
          <div className='pull-right fs-5 text-white'>
            <Image
              style={{
                height: '40px',
                width: '40px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
              src={user.profile?.image ? user.profile?.image : placeholder}
              alt='User pic'
              roundedCircle
            />
            Moje konto <IoIosArrowDropdown />
          </div>
        }
        id='basic-nav-dropdown'
      >
        <NavDropdown.Item
          as={Link}
          to='/user-panel/konto'
          className='text-black'
        >
          Panel użytkownika
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>
          Wyloguj się <FaPowerOff />
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )

  return (
    <Navbar collapseOnSelect expand='lg' className={styles.nav} variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img alt='Logo' src={Brand} width='150' height='30' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mx-auto'>
            <Nav.Link className={styles.link} as={Link} to='/oferty'>
              Oferty Pracy
            </Nav.Link>
            <Nav.Link className={styles.link} as={Link} to='/pracodawcy'>
              Pracodawcy
            </Nav.Link>
          </Nav>
          <Nav>{user ? authLinks() : guestLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { logout })(NavigationBar)

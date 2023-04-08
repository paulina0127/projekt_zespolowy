import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
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
            <Nav.Link as={Link} to="/login">
              <Button variant="warning">Zaloguj się</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/rejestracja">
              <Button variant="outline-warning">Zarejestruj się</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

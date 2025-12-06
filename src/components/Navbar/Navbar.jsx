import { Navbar as BNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <BNavbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          Node-118
        </BNavbar.Brand>

        <BNavbar.Toggle />

        <BNavbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

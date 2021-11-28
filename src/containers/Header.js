import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="#home">
            Student Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/major">
                Major
              </Nav.Link>
              <Nav.Link as={NavLink} to="/instructor">
                Instructor
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student">
                Student
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/#">welcome to ... </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <i className="fas fa-sign-out-alt"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

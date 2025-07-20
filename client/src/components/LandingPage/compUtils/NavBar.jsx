import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand href="#">MediMinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button
              as={NavLink}
              to="/signup"
              variant="outline-light"
              className="me-2"
            >
              Signup
            </Button>
            <Button
              as={NavLink}
              to="/login"
              variant="light"
              className="me-2"
            >
              login
            </Button>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

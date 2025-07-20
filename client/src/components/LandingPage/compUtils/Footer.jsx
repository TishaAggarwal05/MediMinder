import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
function Footer() {
  return (
    <div className="footer">
      <Container>
        <p>© 2025 MediMinder. All rights reserved.</p>
        {/* <p>
          <a href="#" style={{color:'#ffffff'}}>About Us</a> | 
          <a href="#" style={{color:'#ffffff', marginLeft: '10px'}}>Privacy Policy</a> | 
          <a href="#" style={{color:'#ffffff', marginLeft: '10px'}}>Terms of Service</a>
        </p> */}
        <Button
              as={NavLink}
              to="/login"
              variant="light"
              className="me-2"
            >
              login
            </Button>
        <Button
              as={NavLink}
              to="/signup"
              variant="outline-light"
              className="me-2"
            >
              Signup
            </Button>
      </Container>
    </div>
  );
}

export default Footer;

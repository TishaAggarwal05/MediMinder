import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './landing.css'
function HeroSection() {
  return (
    <div className="hero">
      <h1>Your Personal Health Reminder</h1>
      <p>Track medications, manage appointments, and stay on top of your health effortlessly with MediMinder.</p>
      {/* <Button variant="success" size="lg">Get Started</Button> */}
      <Button
              as={NavLink}
              to="/signup"
              variant="success"
              size="lg"
              className="me-2"
            >
              Get Started
            </Button>
    </div>
  );
}

export default HeroSection;

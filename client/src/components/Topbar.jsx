import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Tab, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

export default function Topbar({ toggleSidebar }) {
  return (
    <Navbar className="bar-style" style={{ backgroundColor: '#1b403bff',width: '100%', zIndex: 1050 ,position:"fixed" }} variant="dark" expand="md">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Hamburger for small screens */}
        <Button
          variant="outline-light"
          className="d-md-none me-2"
          onClick={toggleSidebar}
        >
          ☰
        </Button>

        {/* Brand */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            alt=""
            src="https://i.pravatar.cc/80"
            width="30"
            height="30"
            className="rounded-circle me-2"
          />
          MediMinder
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Features() {
  return (
    <>
    
    <div className="features">
      <Container>
        <Row className="mb-4 text-center">
          <h2>Main Features</h2>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Medication Tracking</Card.Title>
                <Card.Text>Never miss a dose with timely reminders for all your medications.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Appointment Calendar</Card.Title>
                <Card.Text>Schedule, view, and manage appointments easily within the app.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Health Tips</Card.Title>
                <Card.Text>Receive personalized health tips to keep you healthy and informed.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    

    </>
  );
}

export default Features;

import { Container, Row, Col, Card, Button, Tab, Nav } from 'react-bootstrap';
import MedStatus from './MedStatus';
import { useState } from "react";
import ApptCard from '../compUtils/ApptCard';
export default function DailyTab({ userId }) {
  const [medStatusRefresh, setMedStatusRefresh] = useState(false);

  const triggerMedStatusRefresh = () => {
    console.log(" triggerMedStatusRefresh was clled")
    setMedStatusRefresh(prev => !prev); // toggles to force rerender
  };
  return (
    <Card className="mb-3 custom-card">
      <Card.Body>
        <Tab.Container defaultActiveKey="medicine today">
          <Nav variant="tabs">
            <Nav.Item><Nav.Link  eventKey="medicine today">pills</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="appointments">Appointments</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="diagnosis">Diagnosis</Nav.Link></Nav.Item>
          </Nav>
          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="medicine today" className="scrollable-tab-pane">
              <MedStatus userId={userId} refreshTrigger={medStatusRefresh} triggerMedStatusRefresh={triggerMedStatusRefresh} />
            </Tab.Pane>
            <Tab.Pane eventKey="appointments" className="scrollable-tab-pane">
              <ApptCard userId={userId} />
            </Tab.Pane>
            <Tab.Pane eventKey="diagnosis" className="scrollable-tab-pane">
              <p>Type 2 Diabetes, Hypertension</p>
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </Card.Body>
    </Card>
  );
}
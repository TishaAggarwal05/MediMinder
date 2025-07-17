// Required packages
// npm install react-router-dom bootstrap react-bootstrap

import React from 'react';





function MedicationTracker() {
  return (
    <Card className="mb-3 custom-card">
      <Card.Body>
        <h6>Today's Medications</h6>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Metformin 500mg - Morning
            <Button size="sm" variant="success">Taken</Button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Amlodipine 5mg - Night
            <Button size="sm" variant="secondary">Skipped</Button>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}







export default function Appi() {
  return (
    <>
   
    </>
    
    
  );
}

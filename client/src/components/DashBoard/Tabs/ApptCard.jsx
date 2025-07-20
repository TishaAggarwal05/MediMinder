import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Card, Button, Row, Col } from 'react-bootstrap';
const ApptCard = ({ userId }) => {
  const [AptData, setAptData] = useState([]);

  useEffect(() => {
    const getaptdetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/appointments/${userId}`);
        console.log("Appointments:", res.data);
        setAptData(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    getaptdetail();
  }, [userId]);



  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight

  const todayAppointments = AptData
    .filter(d => {
      const apptDate = new Date(d.date);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate.getTime() === today.getTime();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      {todayAppointments.length === 0 ? (
        <p className="text-muted">No appointment today</p>
      ) : (
        todayAppointments.map((d, idx) => (
          <Card
            key={idx}
            className="mb-3 custom-card"
            style={{ color: "#1b403bff", border: "1px solid #1b403bff", backgroundColor: "#66CDAA" }}
          >
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h6><strong>Next Appointment</strong></h6>
                  <p>{d.doctorName} - {new Date(d.date).toDateString()}</p>
                  <p>Location: {d.address}</p>
                </Col>
                {/* <Col md={4} className="d-flex flex-column justify-content-center align-items-end gap-2">
                  <Button variant="outline-success" size="sm">Add Notes</Button>
                </Col> */}
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );
};


export default ApptCard;

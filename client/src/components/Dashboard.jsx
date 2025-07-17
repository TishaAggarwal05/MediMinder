import React from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav } from 'react-bootstrap';
import '../App.css'; // Custom styles


import ProfileCard from './ProfileCard'
import DailyTab from './DailyTab'

import { useOutletContext } from 'react-router-dom';

export default function Dashboard() {
  const { User,userId } = useOutletContext();
  console.log(userId)

  return (
    <>
      <div style={{ marginLeft: '50px'}}>

        <Col xs={12} md={10} className="p-3">
          <Row>
            <Col xs={12} >
              <ProfileCard User={User}/>
              <Container fluid="lg" className="mt-5">

                <DailyTab userId={userId}/>
                
              </Container>
            </Col>

          </Row>
        </Col>      
      </div>
        {/* Main Content */}
      
    </>
  );
}
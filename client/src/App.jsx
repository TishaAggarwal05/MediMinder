import React from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './App.css'; // Custom styles

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
// to use NAVIGATE
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import { Outlet } from "react-router"



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = useLocation();
  const navigate = useNavigate();

  // Get userId from state or localStorage
  const locationUserId = location.state?.userId;
  const [userId, setUserId] = useState(() => locationUserId || localStorage.getItem('userId'));

  const [User, setUser] = useState({});

  // If location has userId, update localStorage
  useEffect(() => {
    if (locationUserId) {
      localStorage.setItem('userId', locationUserId);
      setUserId(locationUserId);
    }
  }, [locationUserId]);

  // Fetch user data if userId is available
  useEffect(() => {
    async function getUser() {
      if (!userId) {
        navigate('/login'); // Redirect if userId not available
        return;
      }
      try {
      
        // const res = await axios.get(`http://localhost:3000/user/${userId}`);
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const res = await axios.get(`${backendUrl}/user/${userId}`);
        console.log('Fetched user:', res.data.data);
        setUser(res.data.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }

    getUser();
  }, [userId, navigate]);

  return (
    <>
      <Topbar toggleSidebar={toggleSidebar} />
      <Row className="flex-nowrap">
        {/* Sidebar */}
        <Col
          xs={12}
          md={2}
          className={`sidebar-wrapper p-0 bg-teal ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}
        >
          <Sidebar userId={userId} />
        </Col>

        {/* Main content area */}
        <Col md={10}>
          <div style={{ paddingTop: '76px' }}>
            <Outlet context={{ User, userId }} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App;

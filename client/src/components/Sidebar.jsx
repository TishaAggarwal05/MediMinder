import {  Link } from 'react-router-dom';
import {  Nav } from 'react-bootstrap';



export default function Sidebar({userId}) {
  return (
    <div className="vh-100 p-3 bar-style" style={{ minWidth: '200px', backgroundColor: '#1b403bff', position:"fixed"}}>
      <h5 className="mb-4 text-light">MediMinder</h5>
      <Nav className="flex-column">
        <Link className="nav-link" to="/user/dashboard" state={{userId:userId}}>Dashboard</Link>
        <Link className="nav-link" to="/user/medications" state={{userId:userId}}>Medications</Link>
        <Link className="nav-link" to="/user/appointment">Appointments</Link>
        {/* <Link className="nav-link" to="/tips">Health Tips</Link>
        <Link className="nav-link" to="/assistant">Assistant</Link> */}
      </Nav>
    </div>
  );
}

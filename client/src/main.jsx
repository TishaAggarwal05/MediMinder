import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Landing from './components/landing'
import App from './App.jsx'
import SignupForm from './Forms/SignupForm.jsx';
import Login from './Forms/Login.jsx';
import Medicine from './components/Medicine.jsx';
import AddMedicationForm from './Forms/AddMedicationForm.jsx';
import Appointment from './components/Appointment.jsx';

// require('dotenv').config();

// const port = process.env.PORT;
// const db = process.env.MONGO_URI;



const routes= createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Landing/>}/>
    
    <Route path="/signup" element={<SignupForm/>}/>
    <Route path="/login" element={<Login/>}/>

    <Route path='/user' element={<App/>}>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="medications" element={<Medicine/>}/>
      <Route path="Mediform" element={<AddMedicationForm/>}/>
      <Route path='appointment' element={<Appointment/>}>
    </Route>
    

    </Route>
    

    </>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)

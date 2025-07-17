import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios"
import MedCard from '../compUtils/MedCard';
import { NavLink ,Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import getAdherenceStats from "../compUtils/Analytics/AdherenceStatsfunc.js"



const Medicine = () => {
  const { User, userId } = useOutletContext();
  const [Meds, setMeds] = useState([])
  useEffect(() => {
    // if (!userId) return; // wait until userId is available

    async function getMedicines() {
      try {
        const res = await axios.get(`http://localhost:3000/medicine/${userId}`);
        console.log(res.data.Medlist);
        setMeds(res.data.Medlist);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }

    getMedicines();
  }, []);
  const handledelete= (medID)=>{
   
    setMeds((prevMeds)=>prevMeds.filter((m)=>m._id !==medID))
    

  }

  return (
    <div>
      <h1 style={{color:"#1b403bff"}} className="fw-bold text-center">Medicine <Button style={{border:"solid #1b403bff 2px"}} as={Link} to="/user/Mediform" variant="outline-success">
        +
      </Button></h1>
      <ul>
        {Meds.length != 0 ? Meds.map((m, idx) => {
          return <MedCard Meds={m} handledelete={handledelete} getAdherenceStats={getAdherenceStats} />
        }) : <li>No medicines found.</li>}
      </ul>
      
      
    </div>

  )
}

export default Medicine
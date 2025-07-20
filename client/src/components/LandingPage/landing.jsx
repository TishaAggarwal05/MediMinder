import React from 'react';
import "./compUtils/landing.css"
import Footer from './compUtils/Footer'
import Features from './compUtils/Features'
import HeroSection from './compUtils/HeroSection'
import NavBar from './compUtils/NavBar'
import {NavLink} from  'react-router-dom';
const Landing = () => {
  return (
    // <>
    // <h1>Welcome to mediminder</h1>
    // <NavLink to='/signup'>signup</NavLink>
    // </>
    <>
      <NavBar />
      <HeroSection />
      <Features />
      <Footer />
    </>
    
  )
}

export default Landing



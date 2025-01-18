import react from "react";
import Hero from "../_components/Hero/hero"
import Events from "../_components/Events/events"
import Navbar from "../_components/navbar";
import Testimonial from "../_components/Testimonials/testimonial";
import "./mainpage.css"



import React from 'react'

const mainpage = () => {
  return (
    <div>
    {/* <div className="bg-[#444444] py-10 px-4"> */}
    <div className="overflow-x-hidden">
    <Navbar></Navbar>
    <Hero></Hero>
    <Events></Events>
    <Testimonial></Testimonial>


    {/* </div> */}
    </div></div>
      
)}
export default mainpage
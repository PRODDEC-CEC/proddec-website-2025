"use client"
import react from "react";
import Hero from "./_components/Hero/hero"
import Events from "./_components/Events/events"
import Navbar from "./_components/navbar";
import Testimonial from "./_components/Testimonials/testimonial";
import Footer from "./_components/Contact & Footer/footer";
import "./globals.css"



import React from 'react'

const mainpage = () => {
  return (
    <div>
    <div className="bg-[#3c3c3c] pt-10 px-5">
    <div className="overflow-x-hidden page1">
    <Navbar></Navbar>
    <Hero></Hero>
    <Events></Events>
    </div>
    <div id="page2" className="overflow-hidden mt-10">
    <Testimonial></Testimonial>
    </div>
    <div id="page3" className="overflow-hidden mt-10">
    <Footer></Footer>
    </div>
    </div></div>
      
)}
export default mainpage
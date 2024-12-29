"use client"

import React from 'react'
import "./hero.css"
import gsap from "gsap"
import HeroAbstract from "./abstract.jsx"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const hero = () => {


  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to (".mainHeader", {
      y: 350,
      duration: 0.2,
      delay: 0.5,
      scrollTrigger:{
        trigger : "top",
        start: "top 30%",
        end: "bottom 40%",
        scrub: 2,
        // markers: true,
      }
  })
  })


  useGSAP(() => {
    
  })
  return (
    <div className='mainhero'>
        <div className="wave1">
        <HeroAbstract></HeroAbstract>
        </div>
        <div className="forBlur">

        </div>
        <div className='textmain'>
        <h1 className='mainHeader'>PRODDEC</h1>
        </div>
    </div>
  )
}

export default hero

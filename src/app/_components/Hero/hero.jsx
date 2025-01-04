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

    gsap.to (".mainHeader",{
      y: 350,
      duration: 0.2,
      delay: 0.5,
      scrollTrigger:{
        trigger : "top",
        start: "top 30%",
        end: "bottom 40%",
        scrub: 2,
        // markers: true,
      },
    }),
      gsap.to (".mainText",{
        y: 420,
        duration: 0.2,
        delay: 0.5,
        opacity : 40,
        scrollTrigger:{
          trigger : "top",
          start: "top 30%",
          end: "bottom 40%",
          scrub: 2,
          // markers: true,
        }
      }),

      gsap.to (".mainnText",{
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut'
  })
  })


  useGSAP(() => {
    
  })
  return (
    <div id='heroSection'> 
    <div id="hero-wave1">
    <div className='hero1'>
    <div className="wave1">
    <HeroAbstract></HeroAbstract>
    </div>
    <div className="forBlur">

    </div>
    <div className='textmain'>
    <h1 className='mainHeader'>PRODDEC</h1>
    <p className='mainText'>Hello, How are You!!!</p>
    </div>
    </div>

    <div className='hero2'>
      <div id='imglft'>
          <h1>ABOUT <span>PRODDEC</span></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      </div>
      <div id='imgrig'>
        <div className="imgcntr"></div>
        <div className="imgcntr"></div>
        <div className="imgcntr"></div>

      </div>
      
    </div>

    </div>
</div>
   
  )
}

export default hero

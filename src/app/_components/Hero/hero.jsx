"use client"

import React from 'react'
import "./hero.css"
import gsap from "gsap"
import HeroAbstract from "./abstract.jsx"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Btn1 from "../Button/button1.jsx"


const hero = () => {


  useGSAP(() => {



    gsap.registerPlugin(ScrollTrigger);

    gsap.to (".mainHeader",{
      y: 150,
      filter: "blur(2px)",
      opacity: 0,
      duration: 0.2,
      delay: 0.5,
      scrollTrigger:{
        trigger : "top",
        start: "top 0%",
        end: "bottom 80%",
        scrub: 2,
        // markers: true
      },
    }),
      gsap.to (".mainText",{
        y: 220,
        filter: "blur(2px)",
        opacity: 0,
        duration: 0.2,
        delay: 0.5,
        scrollTrigger:{
          trigger : "top",
          start: "top 0%",
          end: "bottom 90%",
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
  }),

      gsap.to (".imgcntr:nth-child(1)",{
        rotate: 4,
        duration: 1,
        delay: 0.5,
        transformOrigin: "bottom, left",
        ease: 'power2.inOut',
        scrollTrigger:{
          trigger : "top",
          start: "top 76%",
          end: "bottom 90%",
          scrub: 2,
          // markers: true,
        }
      }),

      gsap.to(".imgcntr:nth-child(2)",{
        rotate : 3,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
        transformOrigin: "bottom, left",
        scrollTrigger:{
          trigger : "top",
          start: "top 78%",
          end: "bottom 92%",
          scrub: 2,
          // markers: true,
        }

      })

      gsap.to(".imgcntr:nth-child(3)",{
        rotate : 2,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
        transformOrigin: "bottom, left",
        scrollTrigger:{
          trigger : "top",
          start: "top 80%",
          end: "bottom 94%",
          scrub: 2,
          // markers: true,
        }

      }),

      gsap.to("#heroSection",{
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
        scrollTrigger:{
          trigger : "#heroSection",
          start: "top -30%",
          end: "bottom -32%",
          scrub: 2,
          // markers: true,
        }

  })
    
  })
  return (
    <div id='heroSection'> 
    <div id="hero-wave1">
    <div className='hero1'>
    <div className="wave1">
    <HeroAbstract></HeroAbstract>
    </div>
    <div className='textmain'>
    <h1 className='mainHeader'>PRODDEC</h1>
    <p className='mainText'>Design and Develop</p>
    
    </div>
    </div>

    <div className='hero2'>
      <div id='imglft'>
          <h1>ABOUT <span> PRODDEC</span></h1>
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

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
      y:20,
      filter: "blur(2px)",
      opacity: 0,
      duration: 0.2,
      scrollTrigger:{
        trigger : ".mainText2",
        start: "top 0%",
        end: "bottom 80%",
        scrub: 2,
        // markers: true
      },
    }),
      gsap.to (".mainText",{
        y: 120,
        filter: "blur(2px)",
        opacity: 0,
        duration: 0.2,
        scrollTrigger:{
          trigger : ".mainText2",
          start: "top 0%",
          end: "bottom 70%",
          scrub: 2,
          markers: true,
        }
      }),

      gsap.to (".mainText2",{
        y: 150,
        filter: "blur(2px)",
        opacity: 0,
        duration: 0.2,
        delay: 0.5,
        scrollTrigger:{
          trigger : ".mainText2",
          start: "top 0%",
          end: "bottom 70%",
          scrub: 2,
          // markers: true,
        }
      }),

      gsap.to (".btn1",{
        y: 40,
        opacity: -0.5,
        duration: 0.2,
        scrollTrigger:{
          trigger : ".btn1",
          start: "top 0%",
          end: "bottom 70%",
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
        rotate: -7,
        duration: 1,
        // delay: 0.5,
        transformOrigin: "bottom, left",
        ease: 'power2.inOut',
        scrollTrigger:{
          trigger : ".imgcntr:nth-child(1)",
          start: "top 90%",
          end: "bottom 90%",
          scrub: 1,
          // markers: true,
        }
      }),

      gsap.to(".imgcntr:nth-child(2)",{
        rotate : -5,
        duration: 1,
        // delay: 0.5,
        ease: 'power2.inOut',
        transformOrigin: "bottom, left",
        scrollTrigger:{
          trigger : ".imgcntr:nth-child(2)",
          start: "top 94%",
          end: "bottom 94%",
          scrub: 1,
          // markers: true,
        }

      })

      gsap.to(".imgcntr:nth-child(3)",{
        rotate : -1,
        duration: 1,
        ease: 'power2.inOut',
        transformOrigin: "bottom, left",
        scrollTrigger:{
          trigger : ".imgcntr:nth-child(3)",
          start: "top 98%",
          end: "bottom 98%",
          scrub: 1,
          // markers: true,
        }

      })

      // gsap.to(".hero2",{
      //   opacity: 0,
      //   ease: 'power2.inOut',
      //   scrollTrigger:{
      //     trigger : ".hero2",
      //     start: "top 10%",
      //     end: "bottom 20%",
      //     scrub: 4,
      //     markers: true,
      //   }
      // })
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
    <p className='mainText'>Product Design and Development Center </p>
    <p className='mainText2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    <div className='btn1'>
    <Btn1></Btn1>
    </div>

    
    </div>
    </div>
    {/* The About Section */}
    <div className='hero2'>
      <div id='imglft'>
          <h1>ABOUT <span> PRODDEC</span></h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      </div>
      <div id='imgrig'>
        <div className="imgcntr"></div>
        <div className="imgcntr"></div>
        <div className="imgcntr"></div>
+
      </div>
      
    </div>
 

    </div>
</div>
   
  )
}

export default hero

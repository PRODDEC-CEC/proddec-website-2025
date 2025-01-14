"use client";

import React from 'react'
import "./events.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react'

const add1 = () => {

  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from(".evntimg1",{
      y: -120,
      duration: 1,
      delay: 0.5,
      scrollTrigger :({
        trigger : "#evntcrd",
        start: "top 100%",
        end: "bottom 50%",
        scrub: 3,
        // markers: true
      })
    }),


    gsap.from(".evntimg2",{

      x: -100,
      duration: 1,
      delay: 0.5,
      ease: "power2.inOut",
      scrollTrigger :({
        trigger : "#evntcrd",
        start: "top 100%",
        end: "bottom 50%",
        scrub: 3,
        // markers: true
      })
    }),

    gsap.from(".evntimg3",{

      y: 300,
      duration: 1,
      delay: 0.5,
      scrollTrigger :({
        trigger : "#evntcrd",
        start: "top 100%",
        end: "bottom 50%",
        scrub: 3,
        // markers: true
      })
    }),

    // gsap.from(".evn",{
    //   backgroundColor: "rgba(51, 51, 51, 0.79);",
    //   scrollTrigger :({
    //     trigger : ".evntimg6",
    //     start: "top 100%",
    //     end: "bottom 50%",
    //     scrub: 3,
    //     // markers: true
    //   })
    // }),

    gsap.from(".evntimg4",{
      x: 500,
      duration: 1,
      delay: 0.5,
      scrollTrigger :({
        trigger : "#evntcrd",
        start: "top 100%",
        end: "bottom 50%",
        scrub: 3,
        // markers: true
      })
    }),

    gsap.from(".evntimg5",{
      x: -900,
      duration: 1,
      delay: 0.5,
      scrollTrigger :({
        trigger : "#evntcrd",
        start: "top 100%",
        end: "bottom 50%",
        scrub: 3,
        // markers: true
      })
    })

  })
  
  return (
    <div className=" evn h-[120vh] pt-48 w-[100vw] flex flex-col items-center pb-44 z-40">
      
      <div id='evntcrd'>
        <div className='evntcrds evntimg1'></div>
        <div className='evntcrds evntimg2'></div>
        <div className='evntcrds evntimg3'></div>
        <div className='evntcrds evntimg4'></div>
        <div className='evntcrds evntimg5'></div>
        <div className='evntcrds evntimg6'><h1 className="text-4xl font-bold text-white font-urbanist px-4 mt-4 py-12">LATEST <br />FROM <br /> <span className='font-bold text-[#ECB526] text-5xl'>PRODDEC</span></h1></div>
        
      </div>

    </div>
  )
}

export default add1

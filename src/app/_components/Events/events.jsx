"use client";

import React from 'react'
import "./events.css"
import { useEffect } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react'

const add1 = () => {

  useEffect(() => {
    if (typeof window === "undefined") return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {

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

  
    return () => mm.revert()

  })

  mm.add("(max-width: 768px)", () => {

    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from(".evntimg1",{
      x: -820,
      duration: 1,
      // delay: 0.5,
      ease: "power4.inOut",
      scrollTrigger:({
        target: ".evntimg1",
        start: "top 70%",
        end: "bottom 150%",
        scrub: 2,
        // markers: true
      })
    }),


    gsap.from(".evntimg2",{

      x: -800,
      duration: 1,
      // delay: 0.5,
      ease: "power2.inOut",
      scrollTrigger :({
        trigger : ".evntimg2",
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
        // markers: true
      })
    }),

    gsap.from(".evntimg3",{

    x: 900,
      duration: 1,
      // delay: 0.5,
      scrollTrigger :({
        trigger : ".evntimg3",
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
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
      x: 800,
      duration: 1,
      // delay: 0.5,
      scrollTrigger :({
        trigger : ".evntimg4",
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
        // markers: true
      })
    }),

    gsap.from(".evntimg5",{
      x: -900,
      duration: 1,
      // delay: 0.5,
      scrollTrigger :({
        trigger : ".evntimg5",
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
        // markers: true
      })
    })

    gsap.from(".evntimg6",{

      x: -900,
      duration: 1,
      // delay: 0.5,
      ease: "power2.inOut",
      scrollTrigger :({
        trigger : ".evntimg6",
        start: "top 90%",
        end: "bottom 90%",
        scrub: 2,
        // markers: true
      })
    })  

  })}, [])
  
  return (
    <div className="evn sm:h-[120vh] h-[100vh] evn flex flex-col items-center z-40">
      
      <div id='evntcrd'>
        <div className='evntcrds evntimg1'></div>
        <div className='evntcrds evntimg2'></div>
        <div className='evntcrds evntimg3'></div>
        <div className='evntcrds evntimg4'></div>
        <div className='evntcrds evntimg5'></div>
        <div className='evntcrds evntimg6'><h1 className="text-4xl font-lighter text-white font-NMontreal px-4 mt-4 py-12">LATEST <br />FROM <br /> <span className=' text-[#ECB526] text-4xl font-medium'>PRODDEC</span></h1></div>
      </div>

    </div>
  )
}

export default add1

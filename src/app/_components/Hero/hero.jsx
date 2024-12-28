"use client"

import React from 'react'
import "./hero.css"
import gsap from "gsap"
import HeroAbstract from "./abstract.jsx"
import { useGSAP } from '@gsap/react'


const hero = () => {


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

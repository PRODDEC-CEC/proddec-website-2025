import React from 'react'
import "./footer.css"

const footer = () => {
  return (
    <div className='h-[75vh] w-[100vw] bg-[#121212] pt-8 flex flex-col'>
        <h1 className='text-[#e8e8e8] text-4xl font-light font-NMontreal text-left py-12 px-28'>Contact Us</h1>
      <div className='Footer h-[90%] w-[100%]'>
      </div>
      <div className='footermain h-[10%] w-[100%] flex justify-center items-center'>
        <p className='text-[#a0a0a0] font-urbanist font-light text-base'>© PRODDEC CEC. All rights reserved.</p>
      </div>    
    </div>
  )
}
export default footer

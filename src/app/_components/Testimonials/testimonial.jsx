import React from 'react'
import "./testimonial.css"

const testimonial = () => {
  return (
    <div className="bg-[#121212] h-[75vh]  overflow-hidden flex justify-center items-center">
      <div className='lftside' >
        <h1 className='text-[#f0f0f0] text-2xl font-NMontreal text-left py-12 px-24'>TESTIMONIALS</h1>
        <h1 className='text-[#f0f0f0] text-4xl font-urbanist font-light text-left py-12 px-24'>A Message <br /> From our <br /><span className='text-[#ECB526] text-5xl font-normal'> Previous Members!!</span></h1>
      </div>
      <div className=' flex justify-center items-center w-[62vw] h-[75vh] space-x-4 overflow-hidden'>
        <div className='space-y-5'>
        <div className="cards1 bg-[#222222] w-[24vw] h-[28vh] rounded-3xl"></div>
        <div className="cards1 bg-[#f1f1f1] w-[24vw] h-[28vh] rounded-3xl"></div>
        <div className="cards1 bg-[#222222] w-[24vw] h-[28vh] rounded-3xl"></div>
        </div>
        <div className='space-y-5'>

        <div className="cards1 w-[24vw] h-[28vh] rounded-3xl space-x-4 flex justify-end items-end overflow-hidden">
          <div className="cards21 bg-[#222222] w-[20vw] h-[24vh] rounded-3xl"></div>
          <div className="cards21 bg-[#222222] w-[20vw] h-[24vh] rounded-3xl"></div>
        </div>
        <div className="cards2 bg-[#ebebeb] w-[24vw] h-[28vh] rounded-3xl"></div>
        <div className="cards2 bg-[#f1f1f1] w-[24vw] h-[28vh] rounded-3xl"></div>
        <div className="cards2 bg-[#222222] w-[24vw] h-[28vh] rounded-3xl"></div>
       



        </div>
      </div>
    </div>
  )
}

export default testimonial

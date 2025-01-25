import React from 'react'
import "./testimonial.css"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'

const testimonial = () => {
    
    useEffect(() => {
      if (typeof window === "undefined") return;
  
    const mm = gsap.matchMedia();
  
      
      mm.add("(min-width: 769px)", () => {
        gsap.from("#cards1",{
          y: -200,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          scrollTrigger :({
            trigger : "#testimonials",
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
            // markers: true
          })
          
        })

        gsap.from("#cards2",{
          y: 200,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          scrollTrigger :({
            trigger : "#testimonials",
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
            // markers: true
          })
          
        })

      })
    }, []);

  

  return (
    <div id='testimonials' className="bg-[#1b1b1b] h-[75vh] sm:flex flex justify-center items-center overflow-y-hidden overflow-x-auto ">
      
      <div className='lftside sm-space-y-20 space-y-10 sm:pr-16 ' >
        <h1 className='text-[#e8e8e8] sm:text-2xl text-xl pt-10 font-NMontreal text-center sm:pb-12 '>TESTIMONIALS</h1>
        <h1 className='text-[#e8e8e8] sm:text-4xl text-2xl font-urbanist font-light text-center px-12'>A Message <br /> From our <br /><span className='text-[#ECB526] text-4xl font-normal'> Previous Members!!</span></h1>
      </div>
      <div className=' sm:flex flex justify-center items-center w-[62vw] h-[75vh] sm:space-x-4 space-y-6 '>
        <div id='cards1' className='sm:space-y-5 sm:space-x-0 space-x-5 pt-28 sm:flex-col flex w-auto'>
        <div className="cards1 bg-[#434343] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl"></div>


        <div className="cards1 bg-[#dcdcdc] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl flex flex-col">
        <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 text-base italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 py-2">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circlepic w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-lg'>Sayana Elizabeth Siju</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>President, 2024-25</p>
            </div>
          </div>

        </div>


        <div className="cards1 bg-[#434343] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl"></div>
        </div>
        <div id='cards2' className='sm:space-y-5  sm:space-x-0 space-x-5 pb-28 sm:flex-col flex w-auto'>

        <div className="cards1 sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl space-x-4 flex justify-end items-end overflow-hidden">
          <div className="cards21 bg-[#434343] w-[48%] h-[24vh] rounded-3xl"></div>
          <div className="cards21 bg-[#434343] w-[48%] h-[24vh] rounded-3xl"></div>
        </div>


        <div className="cards2 bg-[#dcdcdc] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl flex flex-col ">
          <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 sm:text-base text-sm italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 pt-4">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circlepic w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-base'>Jithu Girish</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>Tech InCharge Software 2024-25</p>
            </div>
          </div>
        </div>


        <div className="cards2 bg-[#dcdcdc] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl flex flex-col">
        <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 text-base italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 py-2">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circlepic w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-lg'>Abhijith J Nair</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>Public Relations Officer, 2024-25</p>
            </div>
          </div>
        </div>


        <div className="cards2 bg-[#434343] sm:w-[28vw] w-[65vw] h-[28vh] rounded-3xl"></div>
       



        </div>
      </div>
    </div>
  )
}

export default testimonial

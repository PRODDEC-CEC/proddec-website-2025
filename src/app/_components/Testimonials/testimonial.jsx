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
        <div className="cards1 bg-[#333333] w-[24vw] h-[28vh] rounded-3xl"></div>


        <div className="cards1 bg-[#dcdcdc] w-[24vw] h-[28vh] rounded-3xl flex flex-col">
        <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 text-base italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 py-2">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circle w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-lg'>Sayana Elizabeth Siju</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>President, 2024-25</p>
            </div>
          </div>

        </div>


        <div className="cards1 bg-[#333333] w-[24vw] h-[28vh] rounded-3xl"></div>
        </div>
        <div className='space-y-5'>

        <div className="cards1 w-[24vw] h-[28vh] rounded-3xl space-x-4 flex justify-end items-end overflow-hidden">
          <div className="cards21 bg-[#333333] w-[20vw] h-[24vh] rounded-3xl"></div>
          <div className="cards21 bg-[#333333] w-[20vw] h-[24vh] rounded-3xl"></div>
        </div>


        <div className="cards2 bg-[#dcdcdc] w-[24vw] h-[28vh] rounded-3xl flex flex-col">
          <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 text-base italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 py-2">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circle w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-lg'>Jithu Girish</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>Tech InCharge Software 2024-25</p>
            </div>
          </div>
        </div>


        <div className="cards2 bg-[#dcdcdc] w-[24vw] h-[28vh] rounded-3xl flex flex-col">
        <div className="section1 h-[65%] w-[100%] text-left font-urbanist text-[#0a0a0a]">
            <p className='px-7 py-7 leading-6 text-base italic'>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
          </div>
          <div className="section2 h-[35%] w-[100%] flex px-2 py-2">
            <div className='w-[20%] h-[100%] px-3 py-1'>
              <div className='circle w-[60px] bg-slate-500 h-[60px] rounded-full '>

              </div>

            </div>
            <div className='w-[80%] h-[100%] flex flex-col justify-center px-1 items-start space-y-0'>
              <h1 className='text-[#111111] font-NMontreal font-normal text-lg'>Abhijith J Nair</h1>
              <p className='text-[#343434] font-urbanist font-normal text-sm'>Public Relations Officer, 2024-25</p>
            </div>
          </div>
        </div>


        <div className="cards2 bg-[#333333] w-[24vw] h-[28vh] rounded-3xl"></div>
       



        </div>
      </div>
    </div>
  )
}

export default testimonial

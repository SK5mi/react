import React from 'react'
import assets from '../assets/assets_frontend/assets'
// import { Link } from 'react-router-dom'
import Speciality from './SpecialityMenu'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
       {/*---left side for text and some hearder----*/}
       <div className='md:w-1/2 flex flex-col item-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:-mb-7.5'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'> Book Appointment <br />With Trusted Doctors</p>
         
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-medium'>
            <img className='w-28' src={assets.group_profiles} alt="Group Profile" />
         
            <p>Simply browse through our extensive list of <br className='hidden sm:block'/> trusted doctors,<br className='hidden sm:block'/>
             schedule your appointment hassle-free.</p>

          </div>
    
          <a 
             href ="#Speciality" className='inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-gray-700 text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 md:self-start'> Book appointement
             <img className='w-3' src ={assets.arrow_icon} alt=" /img arrow" />
          </a>
        </div>

        {/*---Right side for text and some hearder----*/}

       <div className='md:w-1/2 relative'>
              <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src= {assets.header_img} alt="Header Image" />
       </div>

 
    </div>
  )
}

export default Header

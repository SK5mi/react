import React from 'react'
import assets from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>

         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* --------Left section-------- */}
              <div >
                <img className='mb-5 w-44 cursor-pointer' src = {assets.logo} alt="Logo" /> 
                {/* <h1>Prescripto</h1> */}
                     <p className='w-full md:w-2/3 text-gray-600 leading-6 '>
                         Lorem Ipsum is simply dummy text of the printing
                         and typesetting industry. Lorem Ipsum has been the
                         industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and 
                         scrambled it to make a type specimen book.
                     </p>
              </div>
              {/* --------Center section-------- */}
              <div>
<h1 className='text-xl font-medium mb-5'>COMPANY</h1>
<ul className='flex flex-col gap-2 text-gray-600'>

  <NavLink  to ='/'><p className='px-4 py-2 rounded inline-block active:  hover:bg-primary hover:text-white transition-all duration-300 '>Home</p></NavLink>
  <NavLink  to ='/doctors'><p className='px-4 py-2 rounded inline-block active:  hover:bg-primary hover:text-white transition-all duration-300'>All DOCTORS</p></NavLink>
  <NavLink  to ='/about'><p className='px-4 py-2 rounded inline-block active:  hover:bg-primary hover:text-white transition-all duration-300'>ABOUT</p></NavLink>
  <NavLink  to ='/contact'><p className='px-4 py-2 rounded inline-block active:  hover:bg-primary hover:text-white transition-all duration-300'>CONTACT</p></NavLink>




{/* <li>Home</li>
<li>About us</li>
<li>Delivery</li>
<li>Privacy policy</li> */}
</ul>
              </div>

              {/* --------Right section-------- */}
              <div>
<h1 className='text-xl font-medium mb-5'>GET IN TOUCH</h1>
<ul className='flex flex-col gap-2 text-gray-600'>
<li>+0-000-000-000</li>
<li>greatstackdev@gmail.com</li>
</ul>
              </div>
         </div>

<div>
    <hr/>
  <p className='py-5 text-sm text-center'> Copyright 2026 @ Greatstack.dev - All Right Reserved.</p> 
</div>


    </div>
  )
}

export default Footer

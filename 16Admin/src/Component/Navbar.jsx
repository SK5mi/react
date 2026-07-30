import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
const NavBar = () => {
    const {aToken,setaToken} =useContext(AdminContext)
    const {dToken,setDToken} =useContext(DoctorContext)

const navigate= useNavigate()

    const logout =() =>{
       
       dToken && setDToken('')
        aToken && setaToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && localStorage.removeItem('dToken')
        window.location.href = 'https://react-black-alpha.vercel.app/login'
        
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white '>
      <div className='flex items-center gap-2 text-xs'>
        <img className ='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt ='' />
        <p className='border px-2.5 py-0.6 rounded-full border-gray-500 text-gray-600'>{aToken ?'Admin':'Docter'}</p>
      </div>
     <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>logout</button>
     
    </div>
  )
}

export default NavBar

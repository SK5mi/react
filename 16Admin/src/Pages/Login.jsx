import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [State, setState] = useState('Admin')
  const { setaToken, backendUrl } = useContext(AdminContext)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {setDToken} =useContext(DoctorContext)
const onSubmitHandler =async(event) =>{
event.preventDefault()

try{
if (State ==='Admin') {
  const {data} = await axios.post(backendUrl +'/api/admin/login',{email,password})
  if(data.success){
    localStorage.setItem('aToken',data.token)
    setaToken(data.token)
  }else{
    toast.error(data.message)
  }
}else{
const{data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
if(data.success){
  localStorage.setItem("dToken",data.token)
  setDToken(data.token)
  console.log("Hii printing a data",data.token)
}else{
  toast.error(data)
}
}
}catch(error){
  console.log(error)          // ← see error in console
    toast.error(error.message)
}
}



  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{State}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setpassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required />
        </div>
        <button className='bg-primary text-white rounded-md w-full py-2 mt-1 text-base'>Login</button>
        {
          State === 'Admin'
            ? <p>Doctor Login ?<span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin Login ? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login

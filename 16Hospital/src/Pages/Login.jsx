import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const {backendUrl,token,setToken} =useContext(AppContext)
  const navigate =useNavigate()
  console.log('backendUrl:', backendUrl)
  const [state, setstate] = useState("Sign Up")

  const [email, setemail] = useState("")
  const [Password, setPassword] = useState("")
  const [name, setname] = useState("")


const onSubmitHandler = async(event) =>{
event.preventDefault()
try {

  // This is for Sign up
  if(state === 'Sign Up'){
    const {data} = await axios.post(backendUrl +'/api/user/register',{name,Password,email})
    if(data.success){
      localStorage.setItem('token',data.token)
      setToken(data.token)
    }
    else{
      toast.error(data.message)
    }
  }
  else{
       const {data} = await axios.post(backendUrl +'/api/user/login',{Password,email})
    if(data.success){
      localStorage.setItem('token',data.token)
      setToken(data.token)
  }
  else{
      toast.error(data.message,"not logged in ")
    }}

} catch (error) {
  toast.error(error.message,"outside but caught error")
}


}


useEffect(()=>{
  if(token){
     navigate('/')
  }
  else{
    navigate('/login')
  }
},[token])




  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state ==='Sign Up' ?"Create Account":"Login"}</p>
        <p>Please {state ==='Sign Up' ?"Sign Up":"Login"} to Book appointment</p>
       {state === 'Sign Up' &&
       <div className='w-full'>
             <p>Full Name</p>
             <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setname(e.target.value)} value ={name} required />
      </div>
}
       <div className='w-full'>
             <p>Email Id</p>
             <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setemail(e.target.value)} value ={email} required />
      </div>

       <div className='w-full'>
             <p>{state ==='Sign Up' ?"SetPassword":"Password"}</p>
             <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='Password' onChange={(e)=>setPassword(e.target.value)} value ={Password}   required/>
      </div>

              
             <button type='submit' className='bg-primary text-white  rounded-md w-full text-base py-2  mt-1'>{state ==='Sign Up' ?"Create Account":"Login"} </button>
             {
              state ==='Sign Up'?<p>Already  have an account?<span onClick={()=>{setstate("Login")}} className='text-primary underline cursor-pointer'>Login here</span></p> 
              :<p>Create an new account?<span onClick={()=>{setstate("Sign Up")}} className='text-primary underline cursor-pointer'>Click here</span></p>

             }
               </div>

    </form>
  )
}

export default Login

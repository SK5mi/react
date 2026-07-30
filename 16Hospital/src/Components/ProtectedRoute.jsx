import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Stethoscope, User } from 'lucide-react'
import { AppContext } from '../Context/AppContext'

const ADMIN_APP_URL = 'https://hospital-admin-theta.vercel.app'

const RoleLogin = () => {
  const navigate = useNavigate()
  const { backendUrl, setToken } = useContext(AppContext)
  const [state, setState] = useState('Login') // Login | Sign Up
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, Password } : { email, Password }
      const { data } = await axios.post(backendUrl + endpoint, payload)

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        toast.success('Login successful')
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <div className="relative bg-white rounded-3xl overflow-hidden border grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-[440px] shadow-sm">

        <div className="relative bg-primary flex flex-col justify-center items-start p-10 overflow-hidden">
          <div className="absolute top-0 -right-16 w-56 h-full bg-white rounded-l-[50%]" />
          <div className="relative z-10">
            <h2 className="text-white text-3xl font-bold mb-1">Hello, welcome!</h2>
            <p className="text-white/80 text-sm mb-5">
              {state === 'Sign Up' ? 'Already have an account?' : 'New here?'}
            </p>
            <button
              type="button"
              onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
              className="border border-white text-white rounded-full px-6 py-2 font-medium"
            >
              {state === 'Sign Up' ? 'Login' : 'Register'}
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <User size={22} className="text-primary" />
            <h2 className="text-2xl font-semibold">{state}</h2>
          </div>

          {state === 'Sign Up' && (
            <>
              <label className="text-xs text-gray-500 mb-1 block">Name</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name" required
                className="border rounded-md w-full px-3 py-2 mb-4"
              />
            </>
          )}

          <label className="text-xs text-gray-500 mb-1 block">Email</label>
          <input
            type="text" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email" required
            className="border rounded-md w-full px-3 py-2 mb-4"
          />

          <label className="text-xs text-gray-500 mb-1 block">Password</label>
          <input
            type="Password" value={Password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password" required
            className="border rounded-md w-full px-3 py-2 mb-6"
          />

          <button type="submit" className="w-full bg-primary text-white rounded-md py-2 font-medium">
            {state}
          </button>

          <p className="text-center text-xs text-gray-500 mt-5 mb-3">or login as</p>

          <div className="flex justify-center gap-3">
            
            <a   href={`${ADMIN_APP_URL}/admin-login`}
              title="Admin"
              className="w-11 h-11 rounded-lg border flex items-center justify-center hover:bg-gray-50"
            >
              <ShieldCheck size={19} />
            </a>
            <a
              href={`${ADMIN_APP_URL}/doctor-login`}
              title="Doctor"
              className="w-11 h-11 rounded-lg border flex items-center justify-center hover:bg-gray-50"
            >
              <Stethoscope size={19} />
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoleLogin
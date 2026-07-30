import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck, Stethoscope, User } from 'lucide-react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const HOSPITAL_APP_URL = 'https://react-black-alpha.vercel.app'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const State = location.pathname === '/doctor-login' ? 'Doctor' : 'Admin'
  const Icon = State === 'Admin' ? ShieldCheck : Stethoscope

  const { setaToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (State === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setaToken(data.token)
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10">
      <div className="w-11/12 max-w-5xl">
        <div className="relative bg-white rounded-3xl overflow-hidden border grid grid-cols-1 md:grid-cols-[1fr_1.2fr] min-h-[500px] shadow-sm">

          {/* left panel — welcome text only, no register */}
          <div className="relative bg-primary flex flex-col justify-center items-start p-10 overflow-hidden">
            <div className="absolute top-0 -right-16 w-56 h-full bg-white rounded-l-[50%]" />
            <div className="relative z-10">
              <h2 className="text-white text-3xl font-bold mb-1">Hello, welcome!</h2>
            </div>
          </div>

          {/* right panel — login form */}
          <form onSubmit={onSubmit} className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Icon size={22} className="text-primary" />
              <h2 className="text-2xl font-semibold">
                <span className="text-primary">{State}</span> Login
              </h2>
            </div>

            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email" required
              className="border rounded-md w-full px-3 py-2 mb-4"
            />

            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" required
              className="border rounded-md w-full px-3 py-2 mb-6"
            />

            <button type="submit" className="w-full bg-primary text-white rounded-md py-2 font-medium">
              Login
            </button>

            <p className="text-center text-xs text-gray-500 mt-5 mb-3">or login as</p>

            <div className="flex justify-center gap-3">
              {State === 'Admin' ? (
                <button type="button" onClick={() => navigate('/doctor-login')} title="Doctor"
                  className="w-11 h-11 rounded-lg border flex items-center justify-center hover:bg-gray-50">
                  <Stethoscope size={19} />
                </button>
              ) : (
                <button type="button" onClick={() => navigate('/admin-login')} title="Admin"
                  className="w-11 h-11 rounded-lg border flex items-center justify-center hover:bg-gray-50">
                  <ShieldCheck size={19} />
                </button>
              )}

              <a href={`${HOSPITAL_APP_URL}/login`} title="User"
                className="w-11 h-11 rounded-lg border flex items-center justify-center hover:bg-gray-50">
                <User size={19} />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
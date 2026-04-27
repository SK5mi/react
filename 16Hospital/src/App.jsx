import React from 'react'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import MYappointment from './Pages/MYappointment'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login' 
import Appointment from './Pages/Appointment'
import Navbar from './Components/Navbar'  
import Footer from './Components/Footer'



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/my-appointments' element={<MYappointment />} />
            <Route path='/appointments/:docId' element={<Appointment />} />
            <Route path='/doctors' element={<Doctors/>} /> 
            <Route path='/doctors/:Spacility' element={<Doctors />} />
            <Route path='/Login' element ={<Login/>} />
        </Routes>
<Footer/>

    </div>
  )
}

export default App

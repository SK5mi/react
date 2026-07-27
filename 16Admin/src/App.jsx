import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import Dashboard from './Pages/Admin/Dashboard';
import DoctorList from './Pages/Admin/DoctorList';
import AllAppointment from './Pages/Admin/AllAppointment';
import AddDoctor from './Pages/Admin/AddDoctor';
import { Route, Routes } from 'react-router-dom';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments';
import DoctorDashBoard from './Pages/Doctor/DoctorDashBoard';
import DoctorProfile from './Pages/Doctor/DoctorProfile';

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/*Admin Routes*/}
          <Route path='/' element={<></>} />
          <Route path='/admin -dashboard' element={<Dashboard />} />
          <Route path='/Doctor-List' element={<DoctorList />} />
          <Route path='/All-Appointment' element={<AllAppointment />} />
          <Route path='/Add-Doctor' element={<AddDoctor />} />

          {/*Doctor Routes */}
             {/* <Route path='/' element={<DoctorAppointments/>} /> */}
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-dashboard' element={<DoctorDashBoard />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />

        </Routes>




      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App

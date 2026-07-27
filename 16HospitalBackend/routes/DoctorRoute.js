import express from 'express'
import { doctorList,loginDoctor,AppointmentsDoctor,CancelAppointment,AppointmentComplete,doctorDashboard,doctorProfile,updateDoctorProfile} from '../controllers/DoctersControllers.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,AppointmentsDoctor)
doctorRouter.post('/cancel-Appointment',authDoctor,CancelAppointment)
doctorRouter.post('/Appointment-Complete',authDoctor,AppointmentComplete)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/Setdoctor-Profile',authDoctor,updateDoctorProfile)


export default doctorRouter
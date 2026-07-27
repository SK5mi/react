import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

//import authDoctor from "../../../16HospitalBackend/middlewares/authDoctor";

export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : (''))
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/appointments', {
                headers: { dtoken: dToken }
            })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                // console.log(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //For making a appointment completed from Doctor pannel



    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/Appointment-Complete', { appointmentId }, { headers: { dtoken: dToken } })
            if (data.success) {
                // setAppointments(data.appointments)
                console.log('Appointment is Completed')
                getAppointments()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("i am sending an error", error.message)
        }

    }


    //For Cancelling a Appointment from Doctor pannel 

    const CancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/doctor/cancel-Appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                console.log("appointment is Cancelled")
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //  For getting a data for dashBoard
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/dashboard', { headers: { dToken } })
            if (data.success) {
                setDashData(data.dashData)
                // console.log(data.dashData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    //FOr getting a data for doctor profile Page /doctor-profile

    const getProfileData = async (req, res) => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/doctor-profile', { headers: { dToken } })
            console.log(data)
            if (data.success) {
                setProfileData(data.profileData)
                console.log("Inside Doctor Profile")
                console.log(data.profileData)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }



    // For setting a data for Doctor Profile  page 
const UpdateProfileData = async (updateData) => {
  try {
    const { data } = await axios.post(
      backendURL + '/api/doctor/Setdoctor-Profile',
      updateData, 
      { headers: { dToken } }
    )
    return data
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
    return { success: false, message: error.message }
  }
}


    const value = {
        dToken, setDToken, backendURL, getAppointments, appointments,
        completeAppointment, CancelAppointment, getDashData, setDashData,
        dashData, getProfileData, profileData, setProfileData,UpdateProfileData,
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}




export default DoctorContextProvider
import { createContext,useState } from "react";
import axios from 'axios'
import {toast} from "react-toastify";


export const AdminContext = createContext()
const AdminContextProvider =(props) =>{

    const [aToken, setaToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):(''))
    const [doctors, setdoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const backendUrl =import.meta.env.VITE_BACKEND_URL
const getAllDoctors = async() =>{
    try{

const {data}= await axios.post(backendUrl +'/api/admin/all-Doctor',{},{headers:{aToken}})  
   if(data.success){
    setdoctors(data.doctors)
    console.log(data.doctors)
   }
   else{
    toast.error(data.message)
   }
    }catch(error){
         toast.error(error.message)

    }
}



const changeAvailability = async(docID) =>{
    try{
        const {data} =await axios.post(backendUrl +'/api/admin/changeavailablity',{docID},{headers:{aToken}})
       
        if(data.success){
            toast.success(data.message)
            getAllDoctors()
        }
        else{
            toast.error(data.message)
        }
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
}

const getAllAppointment =async() =>{
    try {
        const {data} = await axios.get(backendUrl +'/api/admin/all-appointments',{headers:{aToken}})
         if(data.success){
            console.log("HII i am Printing an data ",data)
            
           setAppointments(data.appointments)

                       //i am Printing all Appointments
            console.log(data.appointments)
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


const cancelAppointment = async(appointmentId) =>{

    try {

        const {data} = await axios.post(backendUrl +'/api/admin/appointment-cancel',{appointmentId},{headers :{aToken}})
    console.log("Hii i have Cancelled my appointmen",data)
        if(data.success){
            toast.success(data.message)
            
            getDashData()       // <-- refetch dashboard data so latestAppointments updates
            getAllAppointment()
            console.log("Hii i have Cancelled my appointmen")
            

        }else{
           toast.error(data.message)
        }
        
    } catch (error) {
         console.log(error)
        toast.error(error.message)   
    }
}



const getDashData =async() =>{
    try {
        const {data} = await axios.get(backendUrl +'/api/admin/dashboard',{headers:{aToken}})
        if(data.success){
            setDashData(data.dashData)
            console.log( data.dashData)
        }
        else{
             toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)    
    }
}


    const value ={
        aToken,
        setaToken,
        backendUrl,doctors,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointment,cancelAppointment,getDashData,dashData,}
    return(
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
    )
}
  
export default AdminContextProvider
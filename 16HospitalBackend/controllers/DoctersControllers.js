import doctorModel from "../models/DocterModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

//API to change Doctor Availability
const changeAvailability = async (req, res) => {
  try {

    const { docID } = req.body  

    const docData = await doctorModel.findById(docID)
    await doctorModel.findByIdAndUpdate(docID, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//Api for fatching Doctor list

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API for dcotor login 

const loginDoctor = async (req, res) => {
  try {

    const { email, password } = req.body
    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.json({ success: false, message: 'Invalid credentials ON FINDING doCTORS' })
    }
    const isMatch = await bcrypt.compare(password, doctor.password)
    if (isMatch) {
      const token = jwt.sign({ docId: doctor._id }, process.env.jwt_SECRET)
      res.json({ success: true, token })
    } else {
      return res.json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get doctor appointment for doctor model


const AppointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId
    console.log("docId from token:", docId, "| type:", typeof docId)

    const allAppointments = await appointmentModel.find({})
    console.log("Total appointments in DB (no filter):", allAppointments.length)
    if (allAppointments.length > 0) {
      console.log("Sample docId in DB:", allAppointments[0].docId, "| type:", typeof allAppointments[0].docId)
    }

    const docAppointment = await appointmentModel.find({ docId })
    console.log("Matched appointments:", docAppointment.length)

    return res.json({ success: true, appointments: docAppointment })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//API to mark appointment completed for doctor panel


const AppointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const docId = req.docId   // ✅ trusted doctor ID from the verified token, not from the client

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({ success: true, message: 'Appointment Completed' })
    } else {
      return res.json({ success: false, message: 'Appointment cannot be completed' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//API to mark Cancel Appintment by Doctor Pannel



const CancelAppointment = async (req, res) => {
  try {
 const { appointmentId } = req.body
    const docId = req.docId 
    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { concelled: true })
      return res.json({ success: true, message: 'Appointment Cancelled ' })
    } else {
      return res.json({ success: false, message: 'Apponitment cant Cancelled' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//API TO GET DOCOR DASHBOARD DATA FOR DOCTOR PANNEL

const doctorDashboard = async(req,res) =>{
  try {
    const docId = req.docId
const appointments = await appointmentModel.find({docId})
let earning  = 0

appointments.map((item) =>{
  if(item.isCompleted){
earning += item.amount
  }
})


let patients = []

appointments.map((item) =>{
   if(!patients.includes(item.userId)){        
    patients.push(item.userId)
   }

})



const dashData ={
  earning,
  appointments :appointments.length,
  patients :patients.length,
  latestAppointments:appointments.reverse().slice(0,5)
}


res.json({success :true,dashData})
  } catch (error) {
        console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//Api to get Doctor Profile for doctor pannel 
const doctorProfile = async(req,res) =>{
  try {
    const docId = req.docId
    const profileData = await  doctorModel.findById(docId).select(['-password'])
    res.json({success:true,profileData})
    
  } catch (error) {
    console.log('I am throughing an eror from Doctor Profile',error)
    res.json({ success: false, message: error.message })
  }
}


// API to set Doctor profile from Doctor profile 
const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body
    const docId = req.docId

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true } // returns the updated doc, useful for confirming the write
    )

    if (!updatedDoctor) {
      return res.json({ success: false, message: "Doctor not found" })
    }

    res.json({ success: true, message: "Profile Data has been Updated" })
  } catch (error) {
    console.log('Error updating Doctor Profile:', error)
    res.json({ success: false, message: error.message })
  }
}
export { changeAvailability, doctorList, loginDoctor,
   AppointmentsDoctor,CancelAppointment,AppointmentComplete,
   doctorDashboard,doctorProfile,updateDoctorProfile, }
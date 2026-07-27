//API  for adding doctors

import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/DocterModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import UserModel from "../models/UserModel.js"

// For adding a Doctor

const addDoctor = async (req,res) =>{
    try{
const {name,email,password,Speciality,degree,experiance,about,fees,address} =req.body
 const imageFile = req.file  

 console.log({name, email, password, Speciality, degree, experiance, about, fees, address},imageFile)
// res.status(200).json({ success: true, message: "Doctor added" })

if(!name||!email||!password||!Speciality||!degree||!experiance||!about||!fees||!address){
   return  res.json({success:false,message:"Null fields are not allowed"})
}
//  validator email format 
if(!validator.isEmail(email)){
return  res.json({success:false,message:"Please Enter a valid Email"})
}

//validating Strong Password 

if(password.length < 8 ){
    return res.json({success:false,message:"Please Enter a Strong Password"})
}

//Hashing doctor password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

//upload image to cloudinary

const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
const imageURl = imageUpload.secure_url 

const doctorData = {
    name,email,
    image:imageURl,
    password:hashedPassword,
    Speciality,
    degree,
    experiance,
    about,
    fees,
    address:JSON.parse(address),
    date:Date.now()
}


const newDoctor  =new doctorModel(doctorData)
    await newDoctor.save()
return  res.json({success:true,message:"Doctor addedd"})


}catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

//APi for admin login

const loginAdmin =async(req,res) =>{
    try{
        const{email,password} =req.body
        if(email === process.env.Admin_email && password === process.env.Admin_pass){
            const token = jwt.sign(email+password,process.env.jwt_SECRET)
            res.json({success:true,token})
             
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    }catch{
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
//API TO GET ALL DOCTOR FROM aDMIN PANNEL

const allDoctor =async(req,res) =>{
    try{
     const doctors = await doctorModel.find({}).select('-password')
res.json({success:true, doctors})
    }
    catch(error){

        console.log(error)
    res.json({success:false,message:error.message})
    }
}



// API TO GET ALL APPOINTMENT


const appointmentAdmin = async(req,res)=>{
try{
    const appointments = await  appointmentModel.find({})
    res.json({success:true,appointments})
}catch(error){    console.log(error)
    res.json({success:false,message:error.message})}
}


//API  to Cancel appointment from admin

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }


        await appointmentModel.findByIdAndUpdate(appointmentId, { concelled: true });

        // releasing doctor's slot
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        if (!doctorData) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        let slots_booked = doctorData.slots_booked;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



//API TO GET DASHBOARD DATA FOR ADMIN PANEL


const adminDashboard = async(req,res)=>{
    try {
        const doctors =await doctorModel.find({})
        const users = await UserModel.find({})
        const appointment =await appointmentModel.find({})


        const dashData ={
            doctors :doctors.length,
            appointment:appointment.length,
            patients:users.length,
            latestAppointments:appointment.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        onsole.log(error);
        res.json({ success: false, message: error.message });
    }
}


export  {addDoctor,loginAdmin,allDoctor,appointmentAdmin,cancelAppointment,adminDashboard}
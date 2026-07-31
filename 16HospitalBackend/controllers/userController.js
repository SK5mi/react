import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/DocterModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
//API to register user

const registerUser = async (req, res) => {
    try {
        console.log('REQ BODY:', req.body)
        const { name, email, Password } = req.body
        if (!name || !Password || !email) {
            return res.json({ success: false, message: "missing details" })
        }
        //Validating Email 
        if (!validator.isEmail(email)) {
            return res.json({ sucess: false, message: "Enter a valid Email" })
        }
        //chcking password storng or Length

        if (Password.length < 8) {
            return res.json({ sucess: false, message: "Enter a Stroong password" })
        }

        //Hashing USer password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt)   // fixed: was "password" (undefined)
        const userData = {
            name, email, Password: hashedPassword
        }

        const newUser = new UserModel(userData)
        const user = await newUser.save()
        //_id 
        const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET)
        res.json({ success: true, token })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API for user login

const loginUser = async (req, res) => {
    try {
        const { email, Password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Email not exists' })
        }
        const isMatch = await bcrypt.compare(Password, user.Password)   // fixed: was "user.Password" (undefined)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET)
            res.json({ success: true, token })   // also fixed typo: "sucess" -> "success"
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// Api to get user profile data 

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await UserModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


//API to update user profile 

const updateProfile = async (req, res) => {

    try {
        const { userId, name, Phone, address, DOB, gender } = req.body
        const imageFile = req.file
        if (!name || !Phone || !DOB || !gender) {
            return res.json({ success: false, message: 'Data missing' })
        }
        await UserModel.findByIdAndUpdate(userId, { name, Phone, ...(address && { address: JSON.parse(address) }), DOB, gender })
        if (imageFile) {
            //upload image to cloudnary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await UserModel.findByIdAndUpdate(userId, { image: imageURL })

        }
        res.json({ success: true, message: "Profile Updated " })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


///API FOR BOOK APPOINTMENT

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body   // match middleware + frontend

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({ success: false, message: 'doctor not available' })
        }

        let slots_booked = docData.slots_booked || {}

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await UserModel.findById(userId).select('-password')

        const docDataForAppt = docData.toObject()
        delete docDataForAppt.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataForAppt,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Api to get user  for frontend my-appointment page

const listAppointmemnt = async (req, res) => {
    try {
        const { userId } = req.body
        const appointment = await appointmentModel.find({ userId })
        res.json({ success: true, appointment })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//ApI to cancel appointment


const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // verify appointment user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
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

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})



// API to make payment for an appointment using Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.concelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found " })
        }

        // Creating option for Razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // Creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }
}


// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export { registerUser, loginUser, getProfile, updateProfile, listAppointmemnt, bookAppointment, cancelAppointment,paymentRazorpay,verifyRazorpay }
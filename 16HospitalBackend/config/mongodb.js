import mongoose, { connect }  from "mongoose";
const connectDB =async() =>{
    mongoose.connection.on('connected',()=>{console.log("DatabASE Connected")})
   // mongoose.connection.off('Disconnected',() =>{console.log("currently Disconnected")})
    await mongoose.connect(`${process.env.MONGODB_URI}/HospitalAppointment`)
}
export default connectDB

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary  from './config/Cloudnary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/DoctorRoute.js'
import userRouter from './routes/userRoute.js'

//app Config

const app = express()
const port =process.env.PORT ||4000
connectDB()
connectCloudinary()

//middleware

app.use(express.json())
app.use(cors())


//API endpoint 
app.use('/api/admin/',adminRouter)
app.use('/api/doctor/',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/admin/add-doctor

app.get('/', (req,res) =>{
res.status(401).json({ message: 'API Working' }) 
})

app.listen(port,() =>console.log("Server Started",port))
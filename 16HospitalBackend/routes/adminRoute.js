import express from 'express'

import { addDoctor, allDoctor, loginAdmin,appointmentAdmin,cancelAppointment,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multor.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability} from '../controllers/DoctersControllers.js'

const adminRouter = express.Router()
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)

adminRouter.post('/all-Doctor', authAdmin,allDoctor)
adminRouter.post('/changeavailablity', authAdmin,changeAvailability)
adminRouter.get('/all-appointments', authAdmin,appointmentAdmin)
adminRouter.post('/appointment-cancel',authAdmin,cancelAppointment)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


adminRouter.get('/test', (req, res) => {
    res.send('admin route works')
})

export default adminRouter
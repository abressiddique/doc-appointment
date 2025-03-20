import express from "express";
import { addDoctor, loginAdmin ,allDoctors,apointmentsAdmin , appointmentCancel,adminDashboard } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/adminAuth.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailablity )
adminRouter.get('/apointments',authAdmin,apointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;
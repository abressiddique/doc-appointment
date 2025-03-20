import express from "express";
import {getProfile,loginUser,registerUser,updateProfile,bookApointment,listApointments,cancelApointment} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile",upload.single("image"),authUser,updateProfile);
userRouter.post("/book-apointment", authUser, bookApointment);
userRouter.get("/list-apointment", authUser, listApointments);
userRouter.post("/cancel-apointment", authUser, cancelApointment);

export default userRouter;

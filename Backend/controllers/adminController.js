import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import apointmentModel from "../models/apointmentModel.js";
import userModel from "../models/userModel.js";

dotenv.config();

//api for adding doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({
        success: false,
        message: "Error something is missing",
      });
    }

    //checking user already exist or not
    const exists = await doctorModel.findOne({ email });
    if (exists) {
      return res.json({ succes: false, message: "user Already exists" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        succes: false,
        message: "Password must be 8 character or greater",
      });
    }

    //hasing doctor password

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    //upload image to cloudiary

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashed_password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ succes: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    return res.json({ succes: false, message: error.message });
  }
};

//Api for Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ succes: false, message: error.message });
  }
};

//API for All Doctor list for all doctors list

const allDoctors = async (req, res) => {
  try {
    const doctor = await doctorModel.find({}).select("-password"); //isse password nhi include hota hai response me
    res.json({ succes: true, doctor });
  } catch (error) {
    return res.json({ succes: false, message: error.message });
  }
};

// Api to get all apointments list

const apointmentsAdmin = async (req, res) => {
  try {
    const apointments = await apointmentModel.find({});
    res.json({ succes: true, apointments });
  } catch (error) {
    return res.json({ succes: false, message: error.message });
  }
};

//Api for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await apointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Mark appointment as canceled
    await apointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment canceled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

// Api to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const apointments = await apointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      apointments: apointments.length,
      patients: users.length,
      latest_apointments: apointments.reverse().slice(0, 5),
    };

    res.json({ succes: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  apointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};

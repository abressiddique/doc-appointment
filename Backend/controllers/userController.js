//Api for register user
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import apointmentModel from "../models/apointmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      res.json({ success: false, message: "missing details" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "email is not valid" });
    }

    //validating the strength of password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be 8 character long",
      });
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exist" });
    }

    //hashing the password

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashed_password,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api for user Login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

//Api to get user Profile  data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body; //authUser middleware ki help se userId aari h
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

//Api to update user profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data is missing " });
    }
    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender, });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

//API TO BOOK APOINTMENT

const bookApointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    //checking for slots availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "slots not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appoitmentData = { userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now(),};

    const newApointment = new apointmentModel(appoitmentData);
    await newApointment.save();

    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Apointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

//API TO GET USER APOINTMNETS FOR FRONTEND MY-APPOINTMENT PAGE

const listApointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const apointments = await apointmentModel.find({ userId });
    res.json({ success: true, apointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

//API TO CANCEL  APOINTMENT

const cancelApointment = async (req, res) => {
  try {
    const { userId, apointmentId } = req.body;
    const apointmentData = await apointmentModel.findById(apointmentId);
    if (apointmentData.userId !== userId) {
      return res.json({ success: false, message:'Unauthorized action' });
    }
    await apointmentModel.findByIdAndUpdate(apointmentId,{cancelled:true}) //jab slot cancel hoga to uska time bhi free hoga jise jme dobaara render kraana pdega qki booked hone pr ui se vo hide hota tha
    
    //Releasing doctor slot 
    const {docId,slotDate,slotTime} = apointmentData

    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId , {slots_booked})
    res.json({success:true, message:'apointment cancel'})
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookApointment, listApointments, cancelApointment  };

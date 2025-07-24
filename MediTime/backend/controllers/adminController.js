import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

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
      !name || !email || !password || !speciality || !degree ||
      !experience || !about || !fees || !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadRes = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const newDoctor = await doctorModel.create({
      name,
      email,
      image: uploadRes.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    });

    res.status(200).json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .populate("docId", "name speciality")
      .populate("userId", "name email");

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching admin appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.cancelled = true;
    await appointment.save();

    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminDashboard =async (req,res)=>{
  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})
    
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentAdmin,
  cancelAppointmentAdmin, 
  adminDashboard
};

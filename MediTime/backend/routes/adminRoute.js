import express from "express";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentAdmin,
  cancelAppointmentAdmin,
  adminDashboard, 
} from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentAdmin);
adminRouter.patch("/appointments/:id/cancel", authAdmin, cancelAppointmentAdmin); 
adminRouter.get("/dashboard", authAdmin, adminDashboard); 

export default adminRouter;

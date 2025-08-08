import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Taskrouter from "./routes/Task.route.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("err in connecting mongodb", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("hello todo");
});

app.use('/api/task',Taskrouter)

app.listen(PORT, () => {
  console.log("server is running on port" + " " + PORT);
});

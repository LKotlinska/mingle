import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./api/register.js";
import studentRouter from "./api/students.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/register", router);
app.use("/api/students", studentRouter);

mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(8000, () => console.log("Server running on port 3000"));
});

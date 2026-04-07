import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./api/register.js";
import studentRouter from "./api/students.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/register", router);
app.use("/api/companies", companiesRouter);
app.use("/api/students", studentRouter);

app.use("/api/match", matchRouter);

mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

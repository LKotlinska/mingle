import express from "express";
import mongoose from "mongoose";
import Company from "../models/company.js";
const router = express.Router();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI);
};

const registerRouter = router.post("/", async (req, res) => {
  await connectDB();

  const { code, name, skills, traits } = req.body;

  const company = await Company.findOne({ code: code });

  if (!company) {
    return res.status(404).json({ error: "No company matching this code" });
  }
  company.name = name;
  company.skills = skills;
  company.traits = traits;
  await company.save();
  res.json({ ok: true });
});

export default registerRouter;

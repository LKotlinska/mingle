import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Company from "../models/company.js";

const router = express.Router();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI);
};

router.post("/", async (req, res) => {
  await connectDB();

  const { code, name, employment, skills, traits } = req.body;

  const company = await Company.findOne({ code: code });

  if (!company) {
    return res.status(404).json({ error: "No company matching this code" });
  }
  company.name = name;
  company.employment = employment;
  company.skills = skills;
  company.traits = traits;
  await company.save();
  res.json({ ok: true });
});

router.get("/:code", async (req, res) => {
  await connectDB();
  const { code } = req.params;
  const company = await Company.findOne({ code: code });
  console.log(company);

  if (!company) return res.status(404).json({ error: "Not found" });

  res.status(200).json(company);
});

export default router;

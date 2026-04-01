import express from "express";
import Company from "../models/company.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { code, name, employment, skills, traits } = req.body;

  const company = await Company.findOne({ code: code });

  if (!company) {
    return res.json({ error: "No company matching this code" });
  }
  company.name = name;
  company.employment = employment;
  company.skills = skills;
  company.traits = traits;
  await company.save();
  res.json({ ok: true });
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const company = await Company.findOne({ code: code });

  if (!company)
    return res.status(404).json({ error: "No company matching this code" });

  res.status(200).json(company);
});

export default router;

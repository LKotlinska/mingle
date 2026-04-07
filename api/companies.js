import express from "express";
import Company from "../models/company.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().select("name");
    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({ error: "Kunde inte hämta företag" });
  }
});

export default router;

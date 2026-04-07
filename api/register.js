import express from "express";
import Company, { validateCompany } from "../models/company.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({ error: "Kunde inte hämta företag" });
  }
});

router.post("/", async (req, res) => {
  const { code, ...fields } = req.body;
  const company = await Company.findOne({ code: code });

  if (!company) {
    return res.status(404).json({ error: "Företagskoden är ogiltig" });
  }

  const { error } = validateCompany(fields);
  if (error) {
    res.status(422).json({ error: error.details[0].message });
  }

  Object.assign(company, fields);
  await company.save();
  res.json({ ok: true });
});

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const company = await Company.findOne({ code: code });

    if (!company)
      return res.status(404).json({ error: "Företagskoden är ogiltig" });

    res.status(200).json(company);
  } catch {
    res.status(500).json({ error: "Något gick fel, försök igen" });
  }
});

export default router;

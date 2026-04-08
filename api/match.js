import express from "express";
import Company from "../models/company.js";

const router = express.Router();

const matchRouter = router.post("/", async (req, res) => {
  try {
    const employment = [].concat(req.body.employment ?? []);
    const traits = [].concat(req.body.traits ?? []);
    const skills = [].concat(req.body.skills ?? []);
    const companies = await Company.find();

    // Filter by employment type, count trait/skill matches, return top 4 sorted by best match
    const matchedCompanies = companies
      .filter((company) =>
        company.employment.some((prof) => employment.includes(prof)),
      )
      .map((company) => {
        let matches = 0;
        if (traits.length > 0) {
          (company.traits ?? []).forEach((trait) => {
            if (traits.includes(trait)) matches++;
          });
        }
        if (skills.length > 0) {
          (company.skills ?? []).forEach((skill) => {
            if (skills.includes(skill)) matches++;
          });
        }
        return { company, matches };
      })
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 4);

    // If fewer than 4 matches, pad with random companies to always return 4
    if (matchedCompanies.length < 4) {
      companies
        .filter(
          (c) => !matchedCompanies.some((m) => m.company._id.equals(c._id)),
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4 - matchedCompanies.length)
        .forEach((c) => matchedCompanies.push({ company: c, matches: 0 }));
    }

    res.json(matchedCompanies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default matchRouter;

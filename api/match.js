import express from "express";
import Company from "../models/company.js";

const router = express.Router();

const matchRouter = router.post("/", async (req, res) => {
  const { employment, traits, skills } = req.body;
  console.log(employment);
  const companies = await Company.find();

  const matchedCompanies = companies
    .filter((company) =>
      company.employment.some((prof) => employment.includes(prof)),
    )
    .map((company) => {
      let matches = 0;
      company.traits.forEach((trait) => {
        if (traits.includes(trait)) matches++;
      });
      company.skills.forEach((skill) => {
        if (skills.includes(skill)) matches++;
      });
      return { company, matches };
    })
    .sort((a, b) => b.matches - a.matches);

  res.json(matchedCompanies);
});

export default matchRouter;

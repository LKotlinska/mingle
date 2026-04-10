import express from "express";
import Student, { validateStudent } from "../models/student.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ error: "Kunde inte hämta studenter" });
  }
});

router.post("/", async (req, res) => {
  const { error } = validateStudent(req.body);

  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    const normalizedName = req.body.name.trim();
    const existingStudent = await Student.findOne({
      name: normalizedName,
      education: req.body.education,
    });

    if (existingStudent) {
      return res.status(409).json({
        error: "Den här studenten är redan registrerad för vald utbildning.",
      });
    }

    const student = new Student({
      ...req.body,
      name: normalizedName,
    });
    await student.save();
    return res.status(201).json(student);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({
        error: "Den här studenten är redan registrerad för vald utbildning.",
      });
    }

    return res.status(500).json({ error: "Kunde inte spara studenten" });
  }
});

export default router;

import express from "express";
import Student, { validateStudent } from "../models/student.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateStudent(req.body);

  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    const student = new Student(req.body);
    await student.save();
    return res.status(201).json(student);
  } catch (err) {
    return res.status(500).json({ error: "Kunde inte spara studenten" });
  }
});

export default router;

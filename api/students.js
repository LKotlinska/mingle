import express from "express";
import Student, { validateStudent } from "../models/student.js";

const router = express.Router();

function escapeRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();
    const category = (req.query.category || "").trim();
    const sort = (req.query.sort || "").trim();

    const query = {};

    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), "i");
      query.$or = [{ name: searchRegex }, { education: searchRegex }];
    }

    if (category === "digital-designers") {
      query.education = /digital design/i;
    }

    if (category === "webbutvecklare") {
      query.education = /webbutvecklare/i;
    }

    const sortOrder =
      sort === "z-a"
        ? { name: -1 }
        : sort === "a-z"
          ? { name: 1 }
          : { createdAt: -1 };

    const totalCount = await Student.countDocuments(query);
    const students = await Student.find()
      .find(query)
      .sort(sortOrder)
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      data: students,
      page,
      limit,
      totalCount,
      totalPages: Math.max(Math.ceil(totalCount / limit), 1),
    });
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

import express from "express";
import Company from "../models/company.js";

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

    const query = { isPresent: true };

    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), "i");
      query.$or = [{ name: searchRegex }, { employment: searchRegex }];
    }

    if (category === "digital-designers") {
      query.employment = /digital design/i;
    }

    if (category === "webbutvecklare") {
      query.employment = /webbutvecklare/i;
    }

    const sortOrder =
      sort === "z-a"
        ? { name: -1 }
        : sort === "a-z"
          ? { name: 1 }
          : { name: 1 };

    const totalCount = await Company.countDocuments(query);
    const companies = await Company.find(query)
      .select("name employment")
      .sort(sortOrder)
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      data: companies,
      page,
      limit,
      totalCount,
      totalPages: Math.max(Math.ceil(totalCount / limit), 1),
    });
  } catch (err) {
    return res.status(500).json({ error: "Kunde inte hämta företag" });
  }
});

export default router;

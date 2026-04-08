import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./api/register.js";
import companiesRouter from "./api/companies.js";
import matchRouter from "./api/match.js";
import studentRouter from "./api/students.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/register", router);
app.use("/api/companies", companiesRouter);
app.use("/api/students", studentRouter);
app.use("/api/match", matchRouter);

mongoose.connect(process.env.DB_URI);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;

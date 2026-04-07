import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./api/register.js";
import matchRouter from "./api/match.js";

const app = express();

app.use(express.json());

app.use("/api/register", router);

app.use("/api/match", matchRouter);

mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});

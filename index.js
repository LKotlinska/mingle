import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./api/register.js";

const app = express();

app.use(express.json());

app.use("/api/register", router);

mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
});

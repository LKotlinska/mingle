import "dotenv/config";
import express from "express";
import registerRouter from "./api/register.js";

const app = express();

app.use(express.json());

app.use("/api/register", registerRouter);

app.listen(3000, () => console.log("Server running on port 3000"));

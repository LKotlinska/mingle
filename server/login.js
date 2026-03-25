import mongoose from "mongoose";
import Company from "../models/company";
import jwt from "jsonwebtoken";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

export const companyHandler = async (req) => {
  await connectDB();

  const { code } = JSON.parse(req.body);
  const company = await Company.findOne({ code: code });

  if (!company) {
    return { statusCode: 401, body: JSON.stringify({ error: "Ogiltig kod." }) };
  }

  const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);

  // WILL NEED TO REDIRECT TOO?
  return {
    statusCode: 200,
    body: JSON.stringify({ token, company }),
  };
};

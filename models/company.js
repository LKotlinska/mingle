import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  employment: {
    type: String,
    enum: ["Digital Designers", "Webbutvecklare", "Båda"],
    required: true,
  },
  traits: [String],
  skills: [String],
});

export default mongoose.model("Company", companySchema);

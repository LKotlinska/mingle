import Joi from "joi";
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
    type: [String],
    required: true,
  },
  traits: [String],
  skills: [String],
});

function validateCompany(company) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(25).required().messages({
      "string.base": "Name must be text.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must be at least 1 character long.",
      "string.max": "Name cannot exceed 25 characters.",
      "any.required": "Name is required.",
    }),
    employment: Joi.array().items(Joi.string().trim().min(1)).min(1).required().messages({
      "array.min": "At least one employment type is required.",
      "any.required": "Employment is required.",
    }),
    traits: Joi.array().items(Joi.string().trim().min(1)),
    skills: Joi.array().items(Joi.string().trim().min(1)),
  });
  return schema.validate(company);
}
export default mongoose.model("Company", companySchema);

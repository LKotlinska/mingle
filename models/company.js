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
      "string.base": "Namnet måste vara text",
      "string.empty": "Namnet får inte vara tomt",
      "string.min": "Namnet är för kort",
      "string.max": "Namnet får max vara 25 tecken",
      "any.required": "Namnet krävs",
    }),
    employment: Joi.array()
      .items(Joi.string().trim().min(1))
      .min(1)
      .required()
      .messages({
        "array.min": "Minst en anställningstyp krävs",
        "any.required": "Anställningstyp krävs",
      }),
    traits: Joi.array().items(Joi.string().trim().min(1)),
    skills: Joi.array().items(Joi.string().trim().min(1)),
  });
  return schema.validateCompany(company);
}
export default mongoose.model("Company", companySchema);

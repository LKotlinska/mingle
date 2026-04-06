import Joi from "joi";
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    default: "",
  },
  links: {
    type: [String],
    default: [],
  },
  profileImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    education: Joi.string()
      .valid("Digital design", "Webbutvecklare")
      .required(),
    links: Joi.array().items(
      Joi.string()
        .trim()
        .uri({ scheme: [/https?/] }),
    ),
    profileImage: Joi.string().required(),
  });

  return schema.validate(student);
}

export { validateStudent };
export default mongoose.model("Student", studentSchema);

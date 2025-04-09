const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  nickname: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "Frontend Developer",
      "Backend Developer",
      "QA Engineer",
      "Designer",
      "Manager",
      "HR",
    ],
    required: true,
  },
  description: { type: String },
  workplace: { type: String },
  portfolio: [
    {
      title: { type: String, required: true },
      description: { type: String },
      links: [{ type: String }],
      previewImage: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["Контент", "Событие", "Вакансия"],
    required: true,
  },
  direction: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  previewImage: { type: String },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

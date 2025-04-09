const express = require("express");
const checkValiditySession = require("../middleware/checkValiditySession");
const checkValiditySessionOptional = require("../middleware/checkValidityOptional");

const {
  createPost,
  getPosts,
  deletePost,
  editPost,
  likePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/createPost", checkValiditySession, createPost);

router.get("/getPosts", checkValiditySessionOptional, getPosts);

router.delete("/deletePost", checkValiditySession, deletePost);

router.put("/editPost", checkValiditySession, editPost);

router.post("/likePost", checkValiditySession, likePost);

module.exports = router;

const express = require("express");
const checkValiditySession = require("../middleware/checkValiditySession");

const {
  getProfile,
  editProfile,
  createProject,
  deleteProject,
  editProject,
  getProject,
} = require("../controllers/profileController");

const router = express.Router();

router.get("/getProfile/:userId", getProfile);

router.put("/editProfile", checkValiditySession, editProfile);

router.post("/createProject", checkValiditySession, createProject);

router.delete("/deleteProject", checkValiditySession, deleteProject);

router.put("/editProject", checkValiditySession, editProject);

router.get("/users/:userId/project/:projectId", getProject);

module.exports = router;

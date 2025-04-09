const express = require("express");

const {
  register,
  login,
  refreshToken,
  checkSession,
  logout,
} = require("../controllers/authController");

const router = express.Router();

const checkAccessToken = require("../middleware/checkAccessToken");

router.post("/register", register);

router.post("/login", login);

router.get("/refreshToken", refreshToken);

router.get("/checkSession", checkAccessToken, checkSession);

router.post("/logout", logout);

module.exports = router;

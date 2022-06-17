const express = require("express");
const router = express.Router();
const {
  regierUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const {protect} = require('../middleware/authMiddleware')

router.post("/", regierUser);

router.post("/login", loginUser);

router.get("/me",protect, getMe);

module.exports = router;

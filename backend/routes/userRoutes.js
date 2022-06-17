const express = require("express");
const router = express.Router();
const { regierUser, loginUser } = require('../controllers/userController')

router.post("/", regierUser);

router.post("/login", loginUser);

module.exports = router;

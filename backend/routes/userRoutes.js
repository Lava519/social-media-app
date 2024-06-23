const express = require('express');
const router = express.Router();

const { confirm, register, login } = require("../controller/userController.js");

router.post("/confirm", confirm);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
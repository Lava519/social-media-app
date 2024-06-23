const express = require('express');
const router = express.Router();

const { messages } = require("../controller/chatController.js");

router.get("/messages/:userID", messages);

module.exports = router;
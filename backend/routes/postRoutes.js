const express = require('express');
const router = express.Router();

const { upload } = require("../controller/postController.js");

router.post("/upload", upload);

module.exports = router;
const express = require('express');
const router = express.Router();

const { upload, getPosts } = require("../controller/postController.js");

router.post("/upload", upload);
router.get("/posts", getPosts);

module.exports = router;
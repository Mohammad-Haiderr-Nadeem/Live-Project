const express = require("express");
const { postComment, getComments } = require("../controllers/comments");

const router = express.Router();

router.post("/postComment", postComment);
router.get("/getComments", getComments);

module.exports = router;

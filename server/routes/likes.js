const express = require("express");
const {
  getLikes,
  addLike,
  updateLike,
  updateDislike,
  getLikesCount,
} = require("../controllers/likes");

const router = express.Router();

router.get("/getLikes", getLikes);
router.post("/postLike", addLike);
router.patch("/updateLike/:id", updateLike);
router.patch("/updateDislike/:id", updateDislike);
router.get("/getLikesCount/:id", getLikesCount);

module.exports = router;

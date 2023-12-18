const express = require("express");
const { getFriends, addFriend } = require("../controllers/friends");

const router = express.Router();

router.patch("/addFriend/:id", addFriend);
router.get("/getFriends/:id", getFriends);

module.exports = router;

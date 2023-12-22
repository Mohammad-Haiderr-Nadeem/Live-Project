const express = require("express");
const { getFriends, addFriend, removeFriend } = require("../controllers/friends");

const router = express.Router();

router.patch("/addFriend/:id", addFriend);
router.patch("/removeFriend/:id", removeFriend);
router.get("/getFriends/:id", getFriends);

module.exports = router;

const express = require("express");
const {
  addUser,
  checkUser,
  getUsers,
  getUser,
} = require("../controllers/login");
const { uploadFile } = require("../middleware/uploadFile");
const multer = require("multer");
const upload = multer({ dest: "../src/assets/images/" });

const router = express.Router();

router.post("/signUpForm", upload.single("image"), uploadFile, addUser);
router.post("/loginForm", checkUser);
router.get("/getAllProfiles", getUsers);
router.get("/getMyProfile/:id", getUser);

module.exports = router;

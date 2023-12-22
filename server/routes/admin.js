const express = require("express");
const {
  verifyAdmin,
  getAdmin,
  updateAdmin,
  changePassword,
  addAdmin,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/admin");
const { uploadFile } = require("../middleware/uploadFile");
const { updateFile } = require("../middleware/updateFile");
const multer = require("multer");
const upload = multer({ dest: "../src/assets/images/" });

const router = express.Router();

router.post("/checkAdmin", verifyAdmin);
router.get("/getAdminProfile/:id", getAdmin);
router.patch("/updateAdminProfile/:id", updateAdmin);
router.patch("/changePassword/:id", changePassword);
router.post("/addAdmin", upload.single("image"), uploadFile, addAdmin);
router.post("/addUser", upload.single("image"), uploadFile, addUser);
router.patch("/updateUser/:id", upload.single("image"), updateFile, updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;

const express = require("express");
const {
  addBlog,
  getBlogs,
  getApprovedBlogs,
  updateStatus,
  getMyBlogs,
  getMyApprovedBlogs,
  deleteBlog,
  getBlog,
} = require("../controllers/blogs");

const { uploadBlogImage } = require("../middleware/uploadBlogImage");
const multer = require("multer");
const upload = multer({ dest: "../src/assets/images/" });

const router = express.Router();

router.post("/addBlog", upload.single("image"), uploadBlogImage, addBlog);
router.get("/getBlogs", getBlogs);
router.get("/allBlogs/:id", getApprovedBlogs);
router.get("/getMyBlogs/:id", getMyBlogs);
router.get("/getBlog/:id", getBlog);
router.get("/getMyApprovedBlogs/:id", getMyApprovedBlogs);
router.patch("/updateBlog/:id", updateStatus);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;

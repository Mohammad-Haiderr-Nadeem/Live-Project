const express = require("express");
const {
  addBlog,
  getBlogs,
  getApprovedBlogs,
  updateStatus,
  getMyBlogs,
  getMyApprovedBlogs,
  deleteBlog,
} = require("../controllers/blogs");

const router = express.Router();

router.post("/addBlog", addBlog);
router.get("/getBlogs", getBlogs);
router.get("/allBlogs/:id", getApprovedBlogs);
router.get("/getMyBlogs/:id", getMyBlogs);
router.get("/getMyApprovedBlogs/:id", getMyApprovedBlogs);
router.patch("/updateBlog/:id", updateStatus);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;

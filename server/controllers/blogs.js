const modal = require("../models");

const addBlog = async (req, res) => {
  try {
    const { author, blogContent, status, userId } = await req.body;
    const { image } = await req;
    if (!image) {
      if (author && blogContent && status && userId) {
        const blog = await modal.Blogs.create({
          name: author,
          userId,
          content: blogContent,
          status,
        });
        if (blog) {
          return res.status(200).json({ blog });
        } else {
          return res.status(406).json({
            msg: "Error in creating the blog",
          });
        }
      }
    } else {
      if (author && blogContent && status && userId && image) {
        const blog = await modal.Blogs.create({
          name: author,
          userId,
          content: blogContent,
          image,
          status,
        });
        if (blog) {
          return res.status(200).json({ blog });
        } else {
          return res.status(406).json({
            msg: "Error in creating the blog",
          });
        }
      }
    }
  } catch (err) {
    console.log("error in adding blog", err);
  }
};

const getApprovedBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedBlogsId = [];
    approvedBlogsId.push(id);
    const users = await modal.User.findAll();
    users.forEach((user) => {
      if (user && user.friends) {
        user.friends.forEach((friend) => {
          if (friend === id) {
            approvedBlogsId.push(user.id);
          }
        });
      }
    });
    if (approvedBlogsId) {
      const blogs = await modal.Blogs.findAll({
        where: { status: "Accepted" },
      });
      const filteredBlogs = blogs.filter((blog) => {
        const approvedBlogsIdStrings = approvedBlogsId.map(String);
        return approvedBlogsIdStrings.includes(blog.userId.toString());
      });
      if (filteredBlogs.length > 0) {
        return res.status(200).send(filteredBlogs);
      } else {
        return res.status(404).json({ msg: "No Blogs Found" });
      }
    } else {
      return res.status(404).json({ msg: "Error in getting ID" });
    }
  } catch (err) {
    console.log("error in getting all the blogs", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await modal.Blogs.findAll();
    if (blogs) {
      return res.status(200).send(blogs);
    } else {
      return res.status(404).json({ msg: "No Blogs Found" });
    }
  } catch (err) {
    console.log("error in getting all the blogs", err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = await req.params;
    const blog = await modal.Blogs.findOne({ where: { id } });
    if (blog) {
      const { updatedStatus } = await req.body;
      await blog.update({ status: updatedStatus });
      await blog.save();
      return res.status(200).json({ msg: "Updated Successfully!" });
    } else {
      return res.status(404).json({ msg: "No Blog Found!!" });
    }
  } catch (err) {
    console.log("error in updating status", err);
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const blogs = await modal.Blogs.findAll({ where: { userId: id } });
      if (blogs.length > 0) {
        return res.status(200).json({ blogs });
      } else {
        return res.status(404).json({ msg: "User Doesn't Have Any Blog Yet." });
      }
    } else {
      return res.status(400).json({ msg: "Incorrect ID!! User Doesn't Exist" });
    }
  } catch (err) {
    console.log("error in getting my blogs", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const result = await modal.Blogs.destroy({ where: { id } });
      if (result) {
        return res.status(200).json({ msg: "Deleted Successfully!" });
      } else {
        return res.status(404).json({ msg: "Blog Not Found!" });
      }
    } else {
      return res.status(400).json({ msg: "ID is required" });
    }
  } catch (err) {
    console.log("error in deleting blog", err);
  }
};

const getMyApprovedBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const blogs = await modal.Blogs.findAll({
        where: { userId: id, status: "Accepted" },
      });
      if (blogs.length > 0) {
        return res.status(200).json({ blogs });
      } else {
        return res.status(404).json({ msg: "User Doesn't Have Any Blog Yet." });
      }
    } else {
      return res.status(400).json({ msg: "Incorrect ID!! User Doesn't Exist" });
    }
  } catch (err) {
    console.log("error in getting my blogs", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  addBlog,
  getBlogs,
  getApprovedBlogs,
  updateStatus,
  getMyBlogs,
  deleteBlog,
  getMyApprovedBlogs,
};

const modal = require("../models");

const getComments = async (req, res) => {
  try {
    const { id } = await req.query;
    const comments = await modal.Comments.findAll({ where: { blogsId: id } });
    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY COMMENTS" });
    }
  } catch (err) {
    console.log("error in getting the list of comments", err);
  }
};

const postComment = async (req, res) => {
  try {
    const { userId, blogsId, username, comment } = await req.body;
    if (userId && blogsId && username && comment) {
      const createdComment = await modal.Comments.create({
        userId,
        blogsId,
        username,
        comment,
      });
      if (createdComment) {
        return res.status(200).json(createdComment);
      } else {
        return res.status(400).json({ msg: "Error in creating comment!!" });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "userId or BlogsId or UserName or Comment is missing!!" });
    }
  } catch (err) {
    console.log("Error in adding comment to the comments section", err);
  }
};

module.exports = {
  getComments,
  postComment,
};

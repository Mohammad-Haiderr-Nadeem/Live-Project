const modal = require("../models");

const getLikes = async (req, res) => {
  try {
    const { id, userId } = req.query;
    const likes = await modal.Likes.findOne({ where: { blogsId: id } });
    if (likes) {
      let isLiked = false;
      if (likes.liked) {
        likes.liked.forEach((likedId) => {
          if (likedId === userId) {
            isLiked = true;
          }
        });
      }
      if (isLiked) {
        return res.status(200).json({ msg: "yes" });
      } else {
        return res.status(200).json({ msg: "no" });
      }
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY LIKED BLOGS" });
    }
  } catch (err) {
    console.log("error in getting the list of likes", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const addLike = async (req, res) => {
  try {
    const { userId, blogsId } = req.body;
    if (userId && blogsId) {
      const like = await modal.Likes.create({ userId, blogsId });
      if (like) {
        return res.status(200).json(like);
      } else {
        return res.status(409).json({ msg: "CONFLICT in posting like" });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "userId or blogsId or liked is missing" });
    }
  } catch (err) {
    console.log("error in posting like", err);
  }
};

const updateLike = async (req, res) => {
  try {
    const { id } = await req.params;
    const { userId } = await req.body;
    if (id) {
      const LikedBlog = await modal.Likes.findOne({ where: { blogsId: id } });
      if (!LikedBlog.liked) {
        LikedBlog.liked = [];
      }
      if (userId) {
        LikedBlog.liked.push(String(userId));
        await modal.Likes.update(
          {
            liked: LikedBlog.liked,
          },
          { where: { blogsId: id } }
        );
        await LikedBlog.save();
        return res.status(200).json(LikedBlog);
      }
    } else {
      return res.status(400).json({ msg: "No ID found!!" });
    }
  } catch (err) {
    console.log("Error in adding Like to the Like list", err);
  }
};

const updateDislike = async (req, res) => {
  try {
    const { id } = await req.params;
    if (id) {
      const LikedBlog = await modal.Likes.findOne({ where: { blogsId: id } });
      const { userId } = await req.body;
      if (!LikedBlog) {
        return res.status(404).json({ msg: "User not found!" });
      }
      if (!LikedBlog.liked) {
        LikedBlog.liked = [];
      }
      LikedBlog.liked = LikedBlog.liked.filter(
        (likedId) => likedId !== String(userId)
      );
      await LikedBlog.save();
      return res.status(200).json(LikedBlog);
    } else {
      return res.status(400).json({ msg: "No ID found!!" });
    }
  } catch (err) {
    console.log("error in dislikng blog", err);
  }
};

const getLikesCount = async (req, res) => {
  try {
    const { id } = await req.params;
    if (id) {
      const LikedBlog = await modal.Likes.findOne({ where: { blogsId: id } });
      if (!LikedBlog) {
        return res.status(404).json({ msg: "User not found!" });
      }
      if (!LikedBlog.liked) {
        return res.status(200).json(0);
      } else {
        const count = LikedBlog.liked.length;
        return res.status(200).json(count);
      }
    } else {
      return res.status(400).json({ msg: "No ID found!!" });
    }
  } catch (err) {
    console.log("err in getting likes", err);
  }
};

module.exports = {
  getLikes,
  addLike,
  updateLike,
  updateDislike,
  getLikesCount,
};

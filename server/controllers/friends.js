const modal = require("../models");

const getFriends = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await modal.User.findOne({ where: { id } });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
    }
  } catch (err) {
    console.log("error in getting the list of friends", err);
  }
};

const addFriend = async (req, res) => {
  try {
    const { id } = await req.params;
    if (id) {
      const { friendId } = await req.body;
      const user = await modal.User.findOne({ where: { id } });
      const otherUser = await modal.User.findOne({ where: { id: friendId } });
      if (!user && !otherUser) {
        return res.status(404).json({ msg: "User not found!" });
      }
      if (!user.friends) {
        user.friends = [];
      }
      if (!otherUser.friends) {
        otherUser.friends = [];
      }
      if (friendId && user) {
        user.friends.push(String(friendId));
        await modal.User.update(
          {
            friends: user.friends,
          },
          { where: { id } }
        );
        await user.save();

        otherUser.friends.push(String(id));
        await modal.User.update(
          {
            friends: otherUser.friends,
          },
          { where: { id: friendId } }
        );
        await otherUser.save();

        return res.status(200).json(user);
      }
    } else {
      return res.status(400).json({ msg: "No ID found!!" });
    }
  } catch (err) {
    console.log("Error in adding person to the friend list", err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const { friendId } = req.body;
      const user = await modal.User.findOne({ where: { id } });
      const otherUser = await modal.User.findOne({ where: { id: friendId } });

      if (!user || !otherUser) {
        return res.status(404).json({ msg: "User not found!" });
      }

      if (!user.friends) {
        user.friends = [];
      }
      if (!otherUser.friends) {
        otherUser.friends = [];
      }
      user.friends = user.friends.filter(
        (friend) => friend !== String(friendId)
      );
      await user.save();

      otherUser.friends = otherUser.friends.filter(
        (friend) => friend !== String(id)
      );
      await otherUser.save();

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "No ID found!!" });
    }
  } catch (err) {
    console.log("Error in removing friend", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};

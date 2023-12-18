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
        console.log("user friends array: ", user.friends);
        user.friends.push(String(friendId));
        console.log("user friends array after pushing: ", user.friends);
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

module.exports = {
  getFriends,
  addFriend,
};

const jwt = require("jsonwebtoken");
const modal = require("../models");
const bcrypt = require("bcrypt");

const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await modal.Admin.findOne({
        where: { email },
      });
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign(
            {
              data: user,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.cookie("adminAccessToken", token);
          res.cookie("myAdminId", user.id);
          return res.status(200).json({ msg: "SUCCESSFUL" });
        } else {
          res.status(404).json({ msg: "UNSUCCESSFUL!! Invalid Password" });
        }
      } else {
        res.status(406).json({ msg: "User Doesn't exist" });
      }
    } else {
      res.status(400).json({ msg: "email or password is empty" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await modal.Admin.findOne({ where: { id } });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
    }
  } catch (err) {
    console.log("error in getting admin", err);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = await req.params;
    const { firstName, lastName, email } = await req.body;
    const user = await modal.Admin.findOne({ where: { id } });
    if (user) {
      await modal.Admin.update(
        {
          firstName,
          lastName,
          email,
        },
        { where: { id } }
      );
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
    }
  } catch (err) {
    console.log("error in updating the user", err);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = await req.params;
    const { password, newPassword, confirmPassword } = await req.body;

    const user = await modal.Admin.findOne({ where: { id } });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        if (newPassword === confirmPassword) {
          const saltRounds = 10;
          bcrypt.hash(newPassword, saltRounds).then(async (hash) => {
            await modal.Admin.update(
              {
                password: hash,
              },
              { where: { id } }
            );
            await user.save();
            return res.status(200).json(user);
          });
        } else {
          return res.status(404).json({ msg: "PASSWORD ISN'T MATCHING" });
        }
      } else {
        return res.status(404).json({ msg: "INCORRECT PASSWORD" });
      }
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
    }
  } catch (err) {
    console.log("error in updating password", err);
  }
};

const addAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = await req.body;
    const { image } = await req;
    const user = await modal.Admin.findOne({ where: { email } });
    if (!user) {
      if (firstName && lastName && email && image && password) {
        try {
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds).then(async (hash) => {
            const user = await modal.Admin.create({
              firstName,
              lastName,
              password: hash,
              email,
              image,
            });
            return res.status(200).json(user);
          });
        } catch (err) {
          console.log("error in fetching data from front end form: ", err);
          return res.status(400).json(err);
        }
      } else {
        return res.status(406).json({
          msg: "First Name or Last Name or Email or Image or Password is empty",
        });
      }
    } else {
      return res.status(404).json({
        msg: "USER ALREADY EXISTS!!",
      });
    }
  } catch (err) {
    console.log("error in adding admin", err);
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = await req.body;
    const { image } = await req;
    if (firstName && lastName && email && gender && image && password) {
      try {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(async (hash) => {
          const user = await modal.User.create({
            firstName,
            lastName,
            password: hash,
            email,
            gender,
            image,
          });
          if (user) {
            return res.status(201).json({ user });
          } else {
            return res.status(406).json({
              msg: "Error in creating the user",
            });
          }
        });
      } catch (err) {
        console.log("error in fetching data from front end form: ", err);
        return res.status(400).json(err);
      }
    } else {
      return res.status(406).json({
        msg: "First Name or Last Name or Email or Gender or Image or Password is empty",
      });
    }
  } catch (err) {
    console.log("error in adding user", err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const { firstName, lastName, email, gender } = await req.body;
    const { image } = await req;
    if (image) {
      if (id && firstName && lastName && email && gender) {
        const user = await modal.User.findOne({ where: { id } });
        if (user) {
          await modal.User.update(
            {
              firstName,
              lastName,
              email,
              gender,
              image,
            },
            { where: { id } }
          );
          await user.save();
          return res.status(200).json(user);
        } else {
          return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
        }
      } else {
        return res.status(400).json({ msg: "FIELDS ARE EMPTY" });
      }
    } else {
      if (id && firstName && lastName && email && gender) {
        const user = await modal.User.findOne({ where: { id } });
        if (user) {
          await modal.User.update(
            {
              firstName,
              lastName,
              email,
              gender,
              image: user.image,
            },
            { where: { id } }
          );
          await user.save();
          return res.status(200).json(user);
        } else {
          return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
        }
      } else {
        return res.status(400).json({ msg: "FIELDS ARE EMPTY" });
      }
    }
  } catch (err) {
    console.log("error in updating the user", err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: "ID NOT FOUND",
      });
    }
    const user = await modal.User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return res.status(200).json({
        msg: `USER WITH ID:${id} HAS BEEN DELETED!!`,
      });
    } else {
      return res.json({
        msg: `USER WITH ID:${id} NOT FOUND`,
      });
    }
  } catch (err) {
    console.log("error in deleting the user", err);
  }
};

const getAdmins = async (req, res) => {
  try {
    const users = await modal.Admin.findAll();
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USERS" });
    }
  } catch (err) {
    console.log("error in getting all users", err);
  }
};

module.exports = {
  verifyAdmin,
  getAdmin,
  updateAdmin,
  changePassword,
  addAdmin,
  addUser,
  updateUser,
  deleteUser,
  getAdmins,
};

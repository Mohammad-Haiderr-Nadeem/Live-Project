const jwt = require("jsonwebtoken");
const modal = require("../models");
const bcrypt = require("bcrypt");

process.env.JWT_SECRET_KEY = "bhevfqbhuefvqbhuefqhuefqvb2136872368932678";

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
            const token = jwt.sign(
              {
                data: user,
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            res.cookie("accessToken", token);
            res.cookie("myId", user.id);
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
    return res.status(400).json(err);
  }
};

const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await modal.User.findOne({
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
          res.cookie("accessToken", token);
          res.cookie("myId", user.id);
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

const getUsers = async (req, res) => {
  try {
    const users = await modal.User.findAll();
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USERS" });
    }
  } catch (err) {
    console.log("Error in retreiving user", err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await modal.User.findOne({ where: { id } });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "COULDN'T FIND ANY USER" });
    }
  } catch (err) {
    console.log("Error in retreiving user", err);
  }
};

const checkGoogleUser = async (req, res) => {
  try {
    const user = await req.user;
    const existingUser = await modal.User.findOne({
      where: { email: user.email },
    });
    const token = await req.authInfo;
    if (existingUser && token) {
      await bcrypt
        .compare(user.googleId, existingUser.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                data: user,
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            res.cookie("accessToken", token);
            res.cookie("myId", existingUser.id);
            res.redirect("http://localhost:3000/home");
          } else {
            return res
              .status(404)
              .json({ msg: "UNSUCCESSFUL!! Invalid Password" });
          }
        });
    } else {
      const saltRounds = 10;
      await bcrypt.hash(user.googleId, saltRounds).then(async (hash) => {
        const newUser = await modal.User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          password: hash,
          email: user.email,
          gender: user.gender,
          image: user.image,
        });
        if (newUser) {
          res.cookie("accessToken", token);
          res.cookie("myId", existingUser.id);
          return res.redirect("http://localhost:3000/home");
        } else {
          return res
            .status(400)
            .json({ msg: "Error is signing up through Google" });
        }
      });
    }
  } catch (err) {
    console.log("error in logging in/signing up through Google", err);
  }
};

module.exports = {
  addUser,
  checkUser,
  getUsers,
  getUser,
  checkGoogleUser,
};

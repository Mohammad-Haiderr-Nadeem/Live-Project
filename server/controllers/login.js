const jwt = require("jsonwebtoken");
const modal = require("../models");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

process.env.JWT_SECRET_KEY = "bhevfqbhuefvqbhuefqhuefqvb2136872368932678";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haider.algolix@gmail.com",
    pass: "isgc qkdc sgsn hapr",
  },
});

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password, verified } =
      await req.body;
    const { image } = await req;
    if (
      firstName &&
      lastName &&
      email &&
      gender &&
      image &&
      password &&
      verified
    ) {
      try {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(async (hash) => {
          const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });
          const user = await modal.User.create({
            firstName,
            lastName,
            password: hash,
            email,
            gender,
            image,
            otp,
            verified,
          });
          if (user) {
            res.cookie("myId", user.id);
            res.cookie("myEmail", user.email);
            const mailOptions = {
              from: "haider.algolix@gmail.com",
              to: email,
              subject: "Email Verification OTP",
              text: `Your OTP is: ${otp}`,
              //html: "<p>Hello!! This is your OTP.</p>",
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                return res.status(201).json({ user, otp });
              }
            });
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
        if (result && user.verified === "yes") {
          const token = jwt.sign(
            {
              data: user,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.cookie("accessToken", token);
          res.cookie("myId", user.id);
          res.cookie("firstName", user.firstName.trim());
          res.cookie("lastName", user.lastName.trim());
          return res.status(200).json({ msg: "SUCCESSFUL", user });
        } else if (user.verified === "no") {
          res.cookie("myId", user.id);
          return res.status(200).json({ msg: "UNVERIFIED", user });
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

const verifyOtp = async (req, res) => {
  try {
    const { id, otp, verified } = await req.body;
    const user = await modal.User.findOne({ where: { id } });
    if (user) {
      if (user.otp === otp) {
        const token = jwt.sign(
          {
            data: user,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        await modal.User.update(
          {
            verified,
          },
          { where: { id } }
        );
        await user.save();
        const updatedUser = await modal.User.findOne({ where: { id } });
        res.cookie("accessToken", token);
        res.cookie("firstName", user.firstName);
        res.cookie("lastName", user.lastName);
        res.cookie("myId", user.id);
        res.clearCookie("myEmail");
        return res.status(200).json({ msg: "SUCCESSFUL", updatedUser });
      } else {
        return res.status(404).json({ msg: "UNSUCCESSFUL" });
      }
    }
  } catch (err) {
    console.log("error in veryfing OTP", err);
  }
};

const resetOtp = async (req, res) => {
  try {
    const { id, email } = await req.body;

    if (id && email) {
      const user = await modal.User.findOne({
        where: { id },
      });
      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const mailOptions = {
        from: "haider.algolix@gmail.com",
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP is: ${otp}`,
      };
      await modal.User.update(
        {
          otp,
        },
        { where: { id } }
      );
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          if (user) {
            return res.status(200).json({ user, otp });
          }
        }
      });
    }
  } catch (err) {
    console.log("error in reseting OTP", err);
  }
};

module.exports = {
  addUser,
  checkUser,
  getUsers,
  getUser,
  verifyOtp,
  checkGoogleUser,
  resetOtp,
};

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const modal = require("./models");
const bcrypt = require("bcrypt");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const firendsRoute = require("./routes/friends");
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blogs");

app.use(express.json());
app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", firendsRoute);
app.use("/", adminRoutes);
app.use("/", blogRoutes);

const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    const saltRounds = 10;
    const password = "1234";
    bcrypt.hash(password, saltRounds).then(async (hash) => {
      await modal.Admin.findOrCreate({
        where: { email: "faiq@gmail.com" },
        defaults: {
          email: "faiq@gmail.com",
          password: hash,
          firstName: "Faiq",
          lastName: "Shahzad",
          image:
            "https://images.unsplash.com/photo-1492551557933-34265f7af79e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMzE0NDgzMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
        },
      });
    });
    console.log("database connection has been established");
  } catch (err) {
    console.log("error in authentication");
  }
});

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (req.cookie) {
      jwt.verify(
        req.cookie.accessToken,
        process.env.JWT_SECRET_KEY,
        function (err, decoded) {
          if (err) {
            return res.status(400).json({ msg: "Invalid Token" });
          } else {
            req.user = decoded;
            next();
          }
        }
      );
    } else {
      return res.status(400).json({ msg: "Token is required" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { verifyToken };

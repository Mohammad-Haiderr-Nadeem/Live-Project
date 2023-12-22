const updateFile = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
    } else {
      req.image = req.file.filename;
      next();
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { updateFile };

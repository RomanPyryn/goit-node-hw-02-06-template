const { User } = require("../../models/modelUsers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "User looged out successfully",
  });
};

module.exports = logout;

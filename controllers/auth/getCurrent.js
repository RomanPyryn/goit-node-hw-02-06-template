const getCurrent = (req, res, next) => {
  const { email } = req.user;
  res.status(200).json({
    email,
  });
};

module.exports = getCurrent;
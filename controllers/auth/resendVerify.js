const { User } = require("../../models/modelUsers");

const { requestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw requestError(400, "Missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(400, "Verification has already been passed");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.status(200).json({
    message: "Verify email resend",
  });
};

module.exports = resendVerify;

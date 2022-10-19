const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

const { User } = require("../../models/modelUsers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const rendomFileName = uuidv4();
    const { path: tmpUpload, originalname } = req.file;

    const image = await Jimp.read(tmpUpload);
    image.resize(250, 250).write(tmpUpload);

    const extention = originalname.split(".").pop();
    const filename = `${rendomFileName}.${extention}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
      message: "Avatar is changed successfully",
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = changeAvatar;

const { ACCEPTED } = require("http-status");
const UserProfile = require("../../services/userProfile");

//TODO - ADD LOGS
const getUserProfileController = async (req, res, next) => {
  const query = req.query;

  let foundUserProfile;
  try {
    foundUserProfile = await UserProfile.findOne({ ...query });
  } catch (err) {
    return next(err);
  }

  return res.status(ACCEPTED).json({ userProfile: foundUserProfile });
};

module.exports = { getUserProfileController };

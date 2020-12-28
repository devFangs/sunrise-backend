const { ACCEPTED } = require("http-status");
const userProfile = require("../../services/userProfile");

//TODO - ADD LOGS
const getUserProfileController = async (req, res, next) => {
  const query = req.query;

  let foundUserProfile;
  try {
    foundUserProfile = await userProfile.findOne({ ...query });
  } catch (err) {
    return next(err);
  }

  return res.status(ACCEPTED).json({ userProfile: foundUserProfile });
};

module.exports = { getUserProfileController };

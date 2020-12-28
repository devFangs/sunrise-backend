const { CREATED } = require("http-status");
const UserProfile = require("../../services/userProfile");

//TODO - ADD LOGS
//TODO - ADD VALIDATORS
const createUserProfileController = async (req, res, next) => {
  const body = req.body;

  let newUserProfile;
  try {
    newUserProfile = await UserProfile.create({ ...body });
  } catch (err) {
    return next(err);
  }

  return res.status(CREATED).json({ userProfile: newUserProfile });
};

module.exports = { createUserProfileController };

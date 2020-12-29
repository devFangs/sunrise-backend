const { CREATED, UNAUTHORIZED } = require("http-status");
const UserProfile = require("../../services/userProfile");

//TODO - ADD LOGS
//TODO - ADD VALIDATORS
const createUserProfileController = async (req, res, next) => {
  if (!req.user) {
    const err = new Error("User not authenticated. Please login or sign up");
    err.status = UNAUTHORIZED;
    return next(err);
  }
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

const { ACCEPTED, NOT_FOUND } = require("http-status");
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

  if (!foundUserProfile) {
    console.log("ERROR - User profile does not exist.");
    const err = new Error(
      "User profile does not exist. If you are this user, please login to create your profile"
    );
    err.status = NOT_FOUND;
    return next(err);
  }

  return res.status(ACCEPTED).json({ userProfile: foundUserProfile });
};

module.exports = { getUserProfileController };

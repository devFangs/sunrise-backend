const {
  CREATED,
  UNAUTHORIZED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("http-status");
const UserProfile = require("../../services/userProfile");
const UserAuth = require("../../services/userAuth");
const yup = require("yup");
const userAuth = require("../../services/userAuth");

const createUserProfileSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

//TODO - ADD LOGS
//TODO - ADD VALIDATORS
const createUserProfileController = async (req, res, next) => {
  if (!req.user) {
    const err = new Error("User not authenticated. Please login or sign up");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  try {
    await createUserProfileSchema.validate(req.body);
  } catch (err) {
    err.status = BAD_REQUEST;
    return next(err);
  }

  const body = req.body;
  const user = req.user;

  const username = user.username;
  const name = body.name;
  const description = body.description;

  const userProfileBody = {
    username,
    name,
    description,
  };

  let newUserProfile;
  try {
    newUserProfile = await UserProfile.create({ ...userProfileBody });
  } catch (err) {
    return next(err);
  }

  const profileId = newUserProfile._id;
  try {
    await userAuth.update(
      { username },
      { hasProfile: true, profile: profileId }
    );
  } catch (err) {
    console.log(
      "ERROR - Error occured when updateing user auth with newly created user profile"
    );
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  return res.status(CREATED).json({ userProfile: newUserProfile });
};

module.exports = { createUserProfileController };

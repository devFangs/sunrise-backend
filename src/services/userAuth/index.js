const {
  EMPTY_QUERY_FINDONE_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
} = require("../../constants/warning.constants");
const UserAuth = require("../../models/userAuth.model");
const yup = require("yup");

const createUserAuthSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const findOne = async (params = {}) => {
  if (!params) {
    console.log(EMPTY_QUERY_FINDONE_WARNING);
  }

  console.log("INFO - Looking for info with given params", params);

  const user = await UserAuth.findOne({ ...params });

  if (!user) {
    console.log(NO_DOCUMENTS_FOUND_WARNING);
    return;
  }

  if (!user.isActive) {
    console.log("WARNING - User is not active");
    return;
  }

  return user.toObject();
};

const create = async (params) => {
  console.log("INFO - Validating new user auth params");
  await createUserAuthSchema.validate({ ...params });
  console.log("INFO - Params is valid", params);
  console.log("INFO - Creating new user auth with given params", params);
  const newAuthUser = new UserAuth({ ...params });
  console.log("INFO - Saving new user auth");
  const savedAuthUser = await newAuthUser.save();
  console.log("INFO - Saved new user auth");
  return savedAuthUser.toObject();
};

const update = async (query = {}, update = {}) => {
  let findUser = await UserAuth.findOne({ ...query });
  if (!findUser) {
    const err = new Error("User does not exist");
    throw err;
  }

  const updateKeys = Object.keys(update);
  // Update has profile
  if (updateKeys.includes("hasProfile")) {
    console.log("INFO - Update this hasProfileKey");
    findUser.hasProfile = update.hasProfile;
  }

  if (updateKeys.includes("profile")) {
    console.log("INFO - Update this profile");
    findUser.profile = update.profile;
  }

  const savedUser = await findUser.save();

  return savedUser.toObject();
};

module.exports = { findOne, create, update };

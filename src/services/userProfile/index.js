const {
  SERVICE_NOT_CREATED_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
} = require("../../constants/warning.constants");
const UserProfile = require("../../models/userProfile.model");

const findOne = async (params = {}) => {
  const userProfile = await UserProfile.findOne({ ...params });
  if (!userProfile) {
    console.log(NO_DOCUMENTS_FOUND_WARNING, params);
  }
  return userProfile;
};

const create = async (params) => {
  const newUserProfile = new UserProfile({ ...params });
  const savedUserProfile = await newUserProfile.save();
  return savedUserProfile;
};

const update = async (id, params) => {
  console.log(SERVICE_NOT_CREATED_WARNING);
};

module.exports = {
  findOne,
  create,
  update,
};

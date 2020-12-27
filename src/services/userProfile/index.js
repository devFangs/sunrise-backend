const {
  SERVICE_NOT_CREATED_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
  EMPTY_QUERY_FINDONE_WARNING,
} = require("../../constants/warning.constants");
const UserProfile = require("../../models/userProfile.model");

const findOne = async (params = {}) => {
  if (!params) {
    console.log(EMPTY_QUERY_FINDONE_WARNING);
  }
  const userProfile = await UserProfile.findOne({ ...params });
  if (!userProfile) {
    console.log(NO_DOCUMENTS_FOUND_WARNING, params);
  }
  return userProfile;
};

// TODO - Add validators to creation
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

const {
  EMPTY_QUERY_FINDONE_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
} = require("../../constants/warning.constants");
const UserAuth = require("../../models/userAuth.model");

const findOne = async (params = {}) => {
  if (!params) {
    console.log(EMPTY_QUERY_FINDONE_WARNING);
  }

  const user = await UserAuth.findOne({ ...params });

  if (!user) {
    console.log(NO_DOCUMENTS_FOUND_WARNING);
    return;
  }

  if (!user.isActive) {
    return;
  }

  return user.toObject();
};

const create = async (params) => {
  const newAuthUser = new UserAuth({ ...params });
  const savedAuthUser = await newAuthUser.save();
  return savedAuthUser.toObject();
};

module.exports = { findOne, create };

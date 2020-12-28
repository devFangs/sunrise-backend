const {
  SERVICE_NOT_CREATED_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
  EMPTY_QUERY_FINDONE_WARNING,
} = require("../../constants/warning.constants");
const UserProfile = require("../../models/userProfile.model");
const yup = require("yup");

const createUserProfileSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().lowercase().required(),
  description: yup.string(),
});

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

//TODO - ADD LOGS
const create = async (params) => {
  await createUserProfileSchema.validate({ ...params });
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

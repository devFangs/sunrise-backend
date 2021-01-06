const Project = require("../../models/project.model");
const yup = require("yup");
const { Schema } = require("mongoose");
const {
  EMPTY_QUERY_FINDONE_WARNING,
  NO_DOCUMENTS_FOUND_WARNING,
  EMPTY_QUERY_FIND_WARNING,
} = require("../../constants/warning.constants");

const createProjectSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  img: yup.string().notRequired(),
  link: yup.string().notRequired(),
  skills: yup.array(yup.mixed(Schema.Types.ObjectId).notRequired()),
  shortDescription: yup.string().max(200),
  description: yup.array().notRequired(),
});

const findOne = async (params = {}) => {
  if (!params) {
    console.log(EMPTY_QUERY_FINDONE_WARNING);
  }

  console.log("INFO - Looking for info with given params", params);

  const project = await Project.findOne({ ...params });

  if (!project) {
    console.log(NO_DOCUMENTS_FOUND_WARNING);
    return project;
  }

  return project.toObject();
};

const find = async (params = {}) => {
  if (!params) {
    console.log(EMPTY_QUERY_FIND_WARNING);
  }

  console.log("INFO - Looking for info with given params", params);

  const projects = await Project.find({ ...params });
  if (!projects || projects.length === 0) {
    console.log(NO_DOCUMENTS_FOUND_WARNING);
    return projects;
  }

  return projects.map((project) => project.toObject());
};

const create = async (params) => {
  console.log("INFO - Validating new project auth params");
  await createProjectSchema.validate({ ...params });
  console.log("INFO - Params is valid", params);
  console.log("INFO - Creating new project with given params, params");
  const newProject = new Project({ ...params });
  console.log("INFO - Saving new projects");
  const savedProject = await newProject.save();
  console.log("INFO - Saved new project");
  return savedProject.toObject();
};

module.exports = { findOne, find, create };

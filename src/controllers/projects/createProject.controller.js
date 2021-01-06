const Project = require("../../services/projects");
const yup = require("yup");
const { UNAUTHORIZED, BAD_REQUEST, CREATED } = require("http-status");
const { Schema } = require("mongoose");

const createProjectSchema = yup.object().shape({
  name: yup.string().required(),
  img: yup.string().notRequired(),
  link: yup.string().notRequired(),
  skills: yup.array(yup.string()).notRequired(),
  shortDescription: yup.string().max(200),
  description: yup.array().notRequired(),
});

// Project verifies a skill

const createProjectController = async (req, res, next) => {
  if (!req.user) {
    const err = new Error("User not authenticated. Please login or sign up");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  try {
    await createProjectSchema.validate(req.body);
  } catch (err) {
    err.status = BAD_REQUEST;
    return next(err);
  }

  const body = createProjectSchema.cast({ ...req.body });
  const user = req.user;

  const username = user.username;

  // TODO - Validate that the skills are in the DB
  // If not in the DB, create
  // Compare with lowercase

  let newProject;
  try {
    newProject = await Project.create({ ...body, username });
  } catch (err) {
    return next(err);
  }

  // TODO - Get skillsVerification verification
  // Find skill verification by username and skill ObjectId
  // if dont exist, create
  // increment the project skill by 1

  return res.status(CREATED).json({ project: newProject });
};

const { NOT_FOUND, ACCEPTED } = require("http-status");
const Project = require("../../services/projects");

const getProjectController = async (req, res, next) => {
  const query = req.query;

  let foundProject;
  try {
    foundProject = await Project.findOne({ ...query });
  } catch (err) {
    return next(err);
  }

  if (!foundProject) {
    console.log("ERROR - Project not found with given params");
  }

  return res.status(ACCEPTED).json({ project: foundProject });
};

module.exports = { getProjectController };

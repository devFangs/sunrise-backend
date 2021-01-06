const { NOT_FOUND, ACCEPTED } = require("http-status");
const Project = require("../../services/projects");

const getProjectsController = async (req, res, next) => {
  const query = req.query;

  let foundProjects;
  try {
    foundProjects = await Project.find({ ...query });
  } catch (err) {
    return next(err);
  }

  if (!foundProjects || foundProjects.length === 0) {
    console.log("ERROR - Projects not found with given params");
  }

  return res.status(ACCEPTED).json({ project: foundProject });
};

module.exports = { getProjectsController };

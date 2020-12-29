const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST } = require("http-status");
const UserAuth = require("../../services/userAuth");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRES,
} = require("../../config/config.development");
const yup = require("yup");

const signupSchema = yup.object().shape({
  email: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

const signupController = async (req, res, next) => {
  const body = req.body;
  console.log("INFO - Validating body");
  try {
    await signupSchema.validate({ ...body });
  } catch (err) {
    console.log("ERROR - Invalid Body provided");
    err.status = BAD_REQUEST;
    return next(err);
  }
  console.log("INFO - Body is valid");
  const email = body.email;
  const username = body.username;
  const password = body.password;

  console.log("INFO - Creating new user");
  let newUser;
  try {
    newUser = await UserAuth.create({ email, username, password });
  } catch (err) {
    console.log("ERROR - Error occured when creating user auth");
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      {
        user: {
          username: newUser.username,
          email: newUser.email,
        },
      },
      JWT_SECRET_KEY,
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRES }
    );
  } catch (err) {
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  delete newUser.password;

  return res.status(CREATED).json({ token, user: newUser });
};

module.exports = { signupController };

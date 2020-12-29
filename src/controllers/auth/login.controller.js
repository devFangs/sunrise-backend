const {
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  ACCEPTED,
} = require("http-status");
const yup = require("yup");
const UserAuth = require("../../services/userAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRES,
} = require("../../config/config.development");

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const loginController = async (req, res, next) => {
  const body = req.body;
  try {
    console.log("INFO - Validating request body");
    await loginSchema.validate(body);
  } catch (err) {
    console.log("ERROR - Error occured when validating login request body");
    err.status = BAD_REQUEST;
    return next(err);
  }

  const username = body.username;
  const password = body.password;

  console.log("INFO - Finding user with username", username);
  let user;
  try {
    user = await UserAuth.findOne({ username });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    console.log(`ERROR - User with username ${username} does not exist`);
    const err = new Error("Invalid username or password");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  console.log("INFO - Checking if password is correct");
  let correctPassword;
  try {
    correctPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    console.log("ERROR - Error occured when comparing passwords");
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  if (!correctPassword) {
    console.log("ERROR - Invalid password provided for username", username);
    const err = new Error("Invalid username or password");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  console.log("INFO - Pasword correct");
  delete user.password;

  console.log("INFO - Creating jwt token");
  let token;
  try {
    token = jwt.sign(
      {
        user: { username: user.username, email: user.email },
      },
      JWT_SECRET_KEY,
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRES }
    );
  } catch (err) {
    console.log("Error occured when creating jwt token");
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  return res.status(ACCEPTED).json({ token, user });
};

module.exports = { loginController };

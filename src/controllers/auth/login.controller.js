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
    await loginSchema.validate(body);
  } catch (err) {
    err.status = BAD_REQUEST;
    return next(err);
  }

  const username = body.username;
  const password = body.password;

  let user;
  try {
    user = await UserAuth.findOne({ username });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    const err = new Error("Invalid username or password");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  let correctPassword;
  try {
    correctPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  if (!correctPassword) {
    const err = new Error("Invalid username or password");
    err.status = UNAUTHORIZED;
    return next(err);
  }

  delete user.password;
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
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  return res.status(ACCEPTED).json({ token, user });
};

module.exports = { loginController };

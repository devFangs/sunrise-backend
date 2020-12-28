const { INTERNAL_SERVER_ERROR, CREATED } = require("http-status");
const UserAuth = require("../../services/userAuth");
const jwt = require("jsonwebtoken");

const signupController = async (req, res, next) => {
  const body = req.body;
  const email = body.email;
  const username = body.username;
  const password = body.password;

  let newUser;
  try {
    newUser = await UserAuth.create({ email, username, password });
  } catch (err) {
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
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
    );
  } catch (err) {
    err.status = INTERNAL_SERVER_ERROR;
    return next(err);
  }

  delete newUser.password;

  return res.status(CREATED).json({ token, user: newUser });
};

module.exports = { signupController };

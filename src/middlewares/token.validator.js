const { UNAUTHORIZED } = require("http-status");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config.development");
const { AUTH_ERROR } = require("../constants/error.constants");

const tokenValidator = (req, res, next) => {
  let token;
  try {
    token = req.headers.authorization.split(" ")[1];
  } catch (err) {
    console.log("ERROR - Error occuredn when splitting authorization header");
    const error = new Error(AUTH_ERROR);
    error.status = UNAUTHORIZED;
    return next(error);
  }

  if (!token) {
    console.log("ERROR - User is not authorized");
    const err = new Error(AUTH_ERROR);
    err.status = UNAUTHORIZED;
    return next(err);
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("ERROR - Token has expired");
        const error = new Error(AUTH_ERROR);
        error.status = UNAUTHORIZED;
        return next(error);
      }

      console.log("ERROR - User is not authorized");
      const error = new Error(AUTH_ERROR);
      error.status = UNAUTHORIZED;
      return next(error);
    }

    req.user = decodedToken.user;
    return next();
  });
};

module.exports = { tokenValidator };

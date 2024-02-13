const catchError = require("../utils/catch-error");
const createError = require("../utils/createError");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.header.authorization;
  if (!authorization || !authorization.startWith("Bearer")) {
    createError("invalid authorization header", 401);
  }

  const token = authorization.split(" ")[1];
  const decodedPayload = jwtService.verify(token);

  const user = await userService.findUserById(decodedPayload.userId);
  if (!user) {
    createError("user was not found", 401);
  }

  delete user.password;
  req.user = user;
  next();
});

module.exports = authenticate;
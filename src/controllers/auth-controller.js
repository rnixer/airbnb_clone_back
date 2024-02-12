const catchError = require("../utils/catch-error");
const userService = require("../services/user-service");
const createError = require("../utils/createError");

exports.register = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserByEmail(req.email);
  if (existsUser) createError("EMAIL_IN_USE", 400);

  res.status(201).json("success");
});

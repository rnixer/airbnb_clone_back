const catchError = require("../utils/catch-error");
const userService = require("../services/user-service");
const createError = require("../utils/createError");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserByEmail(req.body.email);
  if (existsUser) createError("EMAIL_IN_USE", 400);

  req.body.password = await hashService.hash(req.body.password);

  const newUser = await userService.createUser(req.body);
  const payload = { useId: newUser.id };
  const accessToken = jwtService.sign(payload);
  delete newUser.password;

  res.status(201).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserByEmail(req.body.email);
  // console.log(existsUser);
  if (!existsUser) {
    createError("Invalid Credentials", 400);
  }

  const isMatch = await hashService.compare(
    req.body.password,
    existsUser.password //password ที่ hash แล้วที่ดึงมาจาก db
  );

  if (!isMatch) {
    createError("Invalid Credentials", 400);
  }
  const payload = { userId: existsUser.id };
  const accessToken = jwtService.sign(payload);
  delete existsUser.password;

  res.status(201).json({ accessToken, user: existsUser });
});

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

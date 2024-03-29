const express = require("express");

const authController = require("../controllers/auth-controller");

const authenticate = require("../middlewares/authenticate");

const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validator/validate-auth");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getMe);

module.exports = router;

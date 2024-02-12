const express = require("express");

const authController = require("../controllers/auth-controller");

const { validateRegister } = require("../middlewares/validator/validate-auth");

const router = express.Router();

// router.post("/register", (req, res, next) => {
//   const { name, email, password, confirmPassword } = req.body;
//   res.json({ name, email, password, confirmPassword });
// });
router.post("/register", validateRegister, authController.register);

module.exports = router;

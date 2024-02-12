const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().strip(), //เพื่อลบค่าconfirmPassword หลัง validate เสร็จ
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);

const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "name is require",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "invalid email address",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabet and number",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .strip() //เพื่อลบค่าconfirmPassword หลัง validate เสร็จ
    .messages({
      "string.empty": "password is required",
      "any.only": "password and confirm password did not match",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email is require",
    "any.required": "email is require",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is require",
    "any.required": "password is require",
  }),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);

const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email({ tlds: false }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

exports.validateRegister = validate(registerSchema);

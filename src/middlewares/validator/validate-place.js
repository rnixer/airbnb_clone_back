const Joi = require("joi");
const validate = require("./validator");

const editPlaceSchema = Joi.object({
  property_name: Joi.string().trim(),
  address: Joi.string().trim(),
  description: Joi.string().trim(),
  nightly_price: Joi.string().trim().pattern(/^\d+$/).messages({}),
  mobile_promptpay: Joi.string()
    .trim()
    .pattern(/^\d{10}$/),
});

const createPlaceSchema = Joi.object({
  property_name: Joi.string().trim(),
  address: Joi.string().trim(),
  description: Joi.string().trim(),
  nightly_price: Joi.string().trim().pattern(/^\d+$/).messages({}),
  mobile_promptpay: Joi.string()
    .trim()
    .pattern(/^\d{10}$/),
});

exports.validateEditPlace = validate(editPlaceSchema);
exports.validateCreatePlace = validate(createPlaceSchema);

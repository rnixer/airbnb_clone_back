const Joi = require("joi");
const validate = require("./validator");

const editPlaceSchema = Joi.object({
  nightly_price: Joi.string().email({ tlds: false }),
  //   nightly_price: Joi.string().pattern(/^\d+$/),
});

const createPlaceSchema = Joi.object({
  nightly_price: Joi.string().trim().pattern(/^\d+$/).messages({}),
});

exports.validateEditPlace = validate(editPlaceSchema);
exports.validateCreatePlace = validate(createPlaceSchema);

const Joi = require("joi");
const validate = require("./validator");

const editPlaceSchema = Joi.object({
  //   property_name: Joi.string().trim().required().messages({
  //     "any.required": "Property name is require",
  //   }),
});

exports.validateEditPlace = validate(editPlaceSchema);

const catchError = require("../utils/catch-error");
const imageDownloader = require("image-downloader");
const createError = require("../utils/createError");

const uploadService = require("../services/upload.service");
const placeService = require("../services/place-service");

// console.log(__dirname);

// exports.upload = catchError(async (req, res, next) => {
//   const { link } = req.body;
//   const newName = Data.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(__dirname + "/uploads/" + newName);
// });

// exports.updatePlace = catchError(async (req, res, next) => {
//   if (!req.file) {
//     createError("Image is require", 400);
//   }

//   await placeService.updatePlaceById({ image: req.file }, req.id);
//   res.status(200).json({ message: "success" });
// });

exports.createPlace = catchError(async (req, res, next) => {
  const data = {
    user_id: req.user.id,
    property_name: req.body.property_name,
    nightly_price: req.body.nightly_price,
    address: req.body.address,
    description: req.body.description,
    num_guests: +req.body.num_guests,
    mobile_promptpay: req.body.mobile_promptpay,
  };
  const existPropertyName = await placeService.findPropertyName(
    req.body.property_name
  );
  const existMobilePromptpay = await placeService.findMobilePromptpay(
    req.body.mobile_promptpay
  );

  if (existPropertyName || existMobilePromptpay) {
    createError("property name or mobile promptpay is in use");
  }

  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
  }
  const post = await placeService.createPlace(data);
  res.status(201).json({ post });
});
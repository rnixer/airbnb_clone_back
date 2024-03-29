const express = require("express");

const router = express.Router();
const placeController = require("../controllers/place-controller");
const upload = require("../middlewares/upload");
const {
  validateEditPlace,
  validateCreatePlace,
} = require("../middlewares/validator/validate-place");

// router.patch("/", upload.single("image"), placeController.updatePlace);

router.post(
  "/",
  validateCreatePlace,
  upload.single("image"),
  placeController.createPlace
);
router.get("/", placeController.getAllPlacesById);
router.get("/all", placeController.getAllPlace);
router.delete("/:id", placeController.deletePlaceById);
router.patch(
  "/:id",
  validateEditPlace,
  upload.single("image"),
  placeController.editPlaceById
);

router.get(
  "/:checkInDate/:checkOutDate/:num_guests",
  placeController.getPlacesByDate
);

module.exports = router;

const express = require("express");

const router = express.Router();
const placeController = require("../controllers/place-controller");
const upload = require("../middlewares/upload");

// router.post("/upload-by-link", placeController.upload);

// router.patch("/", upload.single("image"), placeController.updatePlace);

router.post("/", upload.single("image"), placeController.createPlace);
router.get("/", placeController.getAllPlacesById);
router.delete("/:id", placeController.deletePlaceById);
router.patch("/:id", upload.single("image"), placeController.editPlaceById);

module.exports = router;

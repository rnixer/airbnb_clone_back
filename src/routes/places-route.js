const express = require("express");

const router = express.Router();
const placeController = require("../controllers/place-controller");
const upload = require("../middlewares/upload");

// router.post("/upload-by-link", placeController.upload);

// router.patch("/", upload.single("image"), placeController.updatePlace);

router.post("/", upload.single("image"), placeController.createPlace);

module.exports = router;

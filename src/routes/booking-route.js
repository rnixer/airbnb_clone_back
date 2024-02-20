const express = require("express");
const router = express.Router();

const BookingController = require("../controllers/booking-controller");
const upload = require("../middlewares/upload");

router.post("/", upload.single("image"), BookingController.createBooking);
router.get("/", BookingController.getBookedPlaceById);
router.delete("/", BookingController.deleteBookingsByPaymentStatus);

module.exports = router;

const catchError = require("../utils/catch-error");

const uploadService = require("../services/upload.service");
const bookingService = require("../services/booking-service");

exports.createBooking = catchError(async (req, res, next) => {
  const data = {
    property_id: +req.body.property_id,
    user_id: req.user.id,
    checkin_date: new Date(req.body.checkin_date),
    checkout_date: new Date(req.body.checkout_date),
    total_price: +req.body.total_price,
    num_guests: req.body.num_guests,
    payment: {
      create: {
        user_id: req.user.id,
        property_id: +req.body.property_id,
      },
    },
  };

  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
  }
  const booking = await bookingService.createBooking(data);
  res.status(201).json({ booking });
});

exports.getBookedPlaceById = catchError(async (req, res, next) => {
  const bookedPlaces = await bookingService.getBookedList(req.user.id);
  res.status(200).json({ bookedPlaces });
});

exports.deleteBookingsByPaymentStatus = catchError(async (req, res, next) => {
  const bookingDeleted = await bookingService.deleteBookingsByPaymentStatus();
  res.status(200).json({ bookingDeleted });
});

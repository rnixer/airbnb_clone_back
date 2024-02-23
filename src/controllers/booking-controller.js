const catchError = require("../utils/catch-error");

const uploadService = require("../services/upload.service");
const bookingService = require("../services/booking-service");
const error = require("../middlewares/error");
const createError = require("../utils/createError");

exports.createBooking = catchError(async (req, res, next) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(req.body.checkin_date)) {
    createError("check-in date must be a date", 400);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(req.body.checkout_date)) {
    createError("check-out date must be a date", 400);
  }

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

  if (!data.property_id) {
    createError("Property id is not exist", 400);
  }
  if (!data.user_id) {
    createError("User id is not exist", 400);
  }

  if (!data.checkout_date && !data.checkin_date) {
    createError("check-in date or check-out date is not exist", 400);
  }

  if (data.checkout_date <= data.checkin_date) {
    createError("The checkout date must be after the check-in date.", 400);
  }

  if (!data.total_price) {
    createError("total price is not exist.", 400);
  }
  if (!/^\d+$/.test(data.total_price)) {
    createError("total price must be a number.", 400);
  }
  if (!data.num_guests) {
    createError("Number of guests is not exist.", 400);
  }
  if (data.num_guests <= 0) {
    createError("Max number of guests must more than 0");
  }

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

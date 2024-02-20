const catchError = require("../utils/catch-error");
const paymentService = require("../services/payment-service");

exports.createPayment = catchError(async (req, res, next) => {
  const data = {
    property_id: +req.body.property_id,
    user_id: req.user.id,
    booking_id: req.body.booking_id,
  };

  const payment = await paymentService.createPayment(data);
  res.status(201).json({ payment });
});
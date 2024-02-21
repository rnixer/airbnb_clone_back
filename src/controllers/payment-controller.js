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

exports.getPayment = catchError(async (req, res, next) => {
  const payment = await paymentService.getPaymentByPayerId(req.params.payerId);
  res.status(200).json({ payment });
});

exports.updatePayment = catchError(async (req, res, next) => {
  const paymentStatus = await paymentService.updatePaymentById(
    req.body,
    +req.params.id
  );
  res.status(200).json({ paymentStatus });
});

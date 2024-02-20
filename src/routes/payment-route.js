const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment-controller");

router.post("/", paymentController.createPayment);
router.get("/:payerId", paymentController.getPayment);

module.exports = router;

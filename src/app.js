require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth-route");
const placeRoute = require("./routes/places-route");
const bookingRoute = require("./routes/booking-route");
const paymentRoute = require("./routes/payment-route");
const notFound = require("./middlewares/not-found");
const error = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/places", authenticate, placeRoute);
app.use("/bookings", authenticate, bookingRoute);
app.use("/payments", authenticate, paymentRoute);
app.use("/public", express.static("public"));

app.post(
  "/upload",
  require("./middlewares/upload").single("image"),
  (req, res, next) => {
    console.log(req.file); //single
    console.log("**********");
    console.log(req.files); //array,fields
  }
);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("service is running in port", PORT));

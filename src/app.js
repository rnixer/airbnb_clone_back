require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth-route");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("service is running in port", PORT));

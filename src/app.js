require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/auth-route");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.listen(8777, () => console.log(" service is running in port 8777"));

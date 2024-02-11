require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res, next) => {
  res.json("test");
});

app.post("/register", (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  res.json({ name, email, password, confirmPassword });
});

app.listen(8777, () => console.log(" service is running in port 8777"));

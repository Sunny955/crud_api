const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const DBConnect = require("./config/db");

// Load config
dotenv.config();

// Calling DB Connect function to connect to DB
DBConnect();

// Routes
app.use("/", require("./routes/index"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

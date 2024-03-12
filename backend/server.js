const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middlewares
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern")
  .then((result) => {
    console.log("Db is Connected");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });

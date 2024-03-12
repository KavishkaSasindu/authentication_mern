const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userAuthRouter = require("./routes/userAuthRotes");
const helmet = require("helmet");

const app = express();

// middlewares
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Use helmet to set Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      imgSrc: ["'self'", "data:"], // Allow loading images from 'self' and 'data:' scheme
    },
  })
);

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern")
  .then((result) => {
    console.log("Db is Connected");
    app.listen(3001, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });

//   routes
// app.use(userAuthRouter);

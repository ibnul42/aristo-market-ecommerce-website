const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const dotenv = require('dotenv')

const errorMiddleware = require("./middlewares/errors");

// setting uo config file 
dotenv.config({path: 'backend/config/config.env'})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



// import all routes
const products = require("./routes/product");
const payment = require("./routes/payment");

// import auth
const auth = require("./routes/auth");

// import order
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

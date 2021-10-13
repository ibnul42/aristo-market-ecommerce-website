const express = require('express');
const app = express();

const cookeParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookeParser());

// import all routes
const products = require('./routes/product');

// import auth
const auth = require('./routes/auth');

// import order
const order = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
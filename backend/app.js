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

app.use('/api/v1', products);
app.use('/api/v1', auth);

// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
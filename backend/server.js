const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// handle uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Server shutting down due to uncaught exception`);
    process.exit(1); 
})
  
// setting uo config file 
dotenv.config({path: 'backend/config/config.env'})

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// handle unhandled Promise rejections
process.on('unhandledRejection', err => { 
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(() => {
        process.exit(1);
    });
})
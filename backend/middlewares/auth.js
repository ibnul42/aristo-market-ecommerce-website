const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler('Login first to access the resources.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

// handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.roles)){
            console.log(`Role ${req.user.roles} is not allowed to access this resources`);
            return next(
                new ErrorHandler(`Role ${req.user.roles} is not allowed to access this resources`, 403)
            );
        }
        next();
    }
}

const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '',
            url: ''
        }
    })

    sendToken(user, 200, res);
})

// login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if email, pass were entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    // finding user in database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password'), 401);
    }

    // check if password is correct or not
    const isPasswordIsmatched = await user.comparePassword(password);

    if(!isPasswordIsmatched) {
        return next(new ErrorHandler('Invalid email or password'), 401);
    }


    sendToken(user, 200, res); 

})
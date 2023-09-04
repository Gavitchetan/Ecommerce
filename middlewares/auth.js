
import jwt from 'jsonwebtoken';
import ErrorHandler from './erorr.js';
import UserModel from '../models/Usermode.js';

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        console.log(token)


        if (!token) {
            console.log('token not found from frontend')
            return next(new ErrorHandler(401, 'Please log in to access this resource.'));
        }
        console.log('')
        const decoded = jwt.verify(token, process.env.Jwt_secret);
        const user = await UserModel.findById(decoded.id); // Change '_id' to 'id'
        if (!user) {
            return next(new ErrorHandler(401, 'User not found. at Authentication'));
        }
        req.user = user;
        next(); // Call next() to move to the next middleware or route handler
    } catch (error) {
        return next(new ErrorHandler(401, 'Authentication failed.'));
    }
};




export const autheriseRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(400, `Role:${req.user.role} is not allowed to access this resource`)
            );
        }

        next(); // Call next() inside the outer function
    };
};





import jwt from 'jsonwebtoken';
import ErrorHandler from './erorr.js';
import UserModel from '../models/Usermode.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler(401, 'Please log in to access this resource.'));
        }
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




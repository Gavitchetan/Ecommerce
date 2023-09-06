import ErrorHandler from "../middlewares/erorr.js";
import UserModel from "../models/Usermode.js";
import bcrypt from 'bcrypt'
import Cookies from "../utils/cookies.js";
import { sendEmail } from '../utils/sendemail.js'
import crypto from "crypto"
import sendMessage from "../utils/Messstatus.js";
import cloudinary from 'cloudinary';
import fs from 'fs';
// Other imports...
const ExpireTime = 24 * 60 * 60 * 1000;

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.file)
        console.log(req.body)
        if (!req.file || !req.file.path) {

            console.log('Image is not found');
            return next(new ErrorHandler(404, "Image is not received"));
        }
        const isuser = await UserModel.findOne({ email });
        if (isuser) {
            fs.unlinkSync(req.file.path);

            console.log('You are alredy Account ')
            return next(new ErrorHandler(400, "you have allredy accout "))

        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',

        });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, password, email)
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            // Change 'avatar' to 'Avatar' to match the schema
            Avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

        // console.log(result, 'res')
        fs.unlinkSync(req.file.path);

        // res.status(201).json({ message: 'User registered successfully', user });
        const token = Jwt.sign({ id: user._id }, process.env.Jwt_secret);

        res.cookie('token', token, {
            expires: new Date(Date.now() + ExpireTime),
            secure: true, // Set to true for production with HTTPS
            httpOnly: true,
            sameSite: "None", // Use "Lax" or "Strict" if needed
        }).json({
            Message: "cookies are sent successfully",
            user,
        });


    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message || 'An error occurred during registration.',
        });
    }
};





export const Loginuser = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
        return next(new ErrorHandler(400, 'Please enter email and password.'));
    }

    try {
        const user = await UserModel.findOne({ email }).select("+password");
        // console.log(user)

        if (!user) {
            return res.status(400).json({ error: 'User not found. Please create an account.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials. Please check your email and password.' });
        }
        const maxAgeInMilliseconds = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds


        const token = Jwt.sign({ id: user._id }, process.env.Jwt_secret);
        // const expirationDate = new Date(Date.now() + maxAgeInMilliseconds 

        res.cookie('token', token, {
            expires: new Date(Date.now() + ExpireTime),
            httpOnly: true,
            sameSite: "None",
            secure: true
        }).json({
            Message: "cookies are send succesfully",
            user,
        })


    } catch (error) {
        console.log(error)
        return next(error);
    }
};


const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

export const ForgotPasswrod = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler(404, "User not found"));
        }

        const resetToken = generateResetToken();
        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/user/password/reset/${resetToken}`;
        const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nWe hope this message finds you well. It appears that you have requested to reset your password for your [Website/App Name] account. If you did not initiate this request, you can safely ignore this email. However, if you did request a password reset, please follow the instructions below to regain access to your account.`; // Construct the email message

        // Set the reset token and expiration time in the user document
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes
        await user.save({ validateBeforeSave: false });

        await sendEmail({
            email: user.email,
            subject: "E-commerce Password Recovery",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent successfully to ${user.email}`
        });
    } catch (error) {
        return next(new ErrorHandler(400, error));
    }
};





// import bcrypt from 'bcryptjs'; // Import the bcrypt library

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;

        const resetPasswordToken = crypto.createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorHandler(404, 'Reset password token is invalid or has expired'));
        } else if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler(400, "Passwords don't match"));
        }

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // You might want to generate and send a new JWT token here if you're using authentication

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        // If an error occurs during the process, you should handle it properly
        next(error);
    }
};


export const Alluser = async (req, res, next) => {
    const User = await UserModel.find({});
    res.status(200).json({
        Success: true,
        Users: User,
    })
}


export const GetmYprofile = async (req, res, next) => {
    res.status(200).json({
        Message: "Your Profile",
        User: req.user
    })

}


export const Logout = async (req, res, next) => {

    res.cookie('token', '', {
        expires: new Date(Date.now()),
        httpOnly: true,

    }).status(200).json({
        Message: "logout succesfully",

    })

}
import Jwt from "jsonwebtoken";

export const UpdateUserpasswrod = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const decode = Jwt.verify(token, process.env.Jwt_secret); // Make sure the secret matches the one used during token creation

        const user = await UserModel.findById(decode.id).select("+password");
        if (!user) {
            return sendMessage(res, 404, "User not found");
        }

        const { oldPassword, password, confirmPassword } = req.body;

        // Check if the provided old password matches the user's current password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return sendMessage(res, 400, "Old password is incorrect");
        }

        // Validate the new password and confirmation
        if (password !== confirmPassword) {
            return sendMessage(res, 400, "Passwords do not match");
        }

        // Hash and update the new password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        user.password = hashedPassword;
        await user.save();

        sendMessage(res, 200, "Password changed successfully");
    } catch (error) {
        // Handle errors properly
        next(error);
    }
};

export const UpdateProfile = async (req, res, next) => {
    const Newuser_Data = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await UserModel.findByIdAndUpdate(req.user.id, Newuser_Data, {
        new: true,
        runValidators: true,
    })
    // sendMessage(res, 200, "updated sucessfull,")
    Cookies(res, 200, "user Updated successfully", user)

}

// for addmin /
export const GetallUser = async (req, res, next) => {
    const user = await UserModel.find({});
    sendMessage(res, 200, user, "users")
}
// Single User 
export const GetOneuser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return next(new ErrorHandler(200, "User not found "))
        }
        res.status(200).json({
            success: true,
            user
        })

        sendMessage(res, 200, user)
    } catch (error) {
        next()
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(404, 'User does not exist with this id'));
        }

        await user.deleteOne();
        sendMessage(res, 200, "account is deleted");
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
};


export const UpdateUserRole = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        };

        const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
            new: true, // Return the updated user after the update
            runValidators: true, // Run model validators on the updated data
        });

        if (!user) {
            return next(new ErrorHandler(404, 'User not found'));
        }
        sendMessage(res, 200, `now ${user.role} is becomes to ${req.body.role}`)
    } catch (error) {
        next(error);
    }
};

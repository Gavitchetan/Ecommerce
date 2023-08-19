import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [30, "can not exiced to "],
        minLength: [4, "Name should have more than 4 charectors"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "password must be greater than 8 charector"],
        select: false
    },
    Avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})



userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes
    return resetToken;
};
userSchema.methods.GetRandomPasswordtoken = function () {

    const reset_token = crypto.randomBytes(20).toString(20);

    this.resetPasswordToken = crypto.createHash('sha256').update(reset_token).digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    return reset_token;
}

const UserModel = mongoose.model('User', userSchema);
export default UserModel


import bcrypt from 'bcrypt'

import ErrorHandler from '../middlewares/erorr.js'
import UserModel from '../models/Usermode.js';
import { sendEmail } from '../utils/sendemail';
import sendMessage from '../utils/Messstatus.js';
sendMessage
const Send_message_Forgot_password = async (req, res, next) => {
    let user;
    try {
        const { email } = req.body;

        user = await UserModel.findOne({ email })
        if (!user) {
            return next(new ErrorHandler(404, 'User not found In database'))
        }
        // first of fall we need userPassword token
        const reset_token = user.GetRandomPasswordtoken();
        await user.save({ validateBeforeSave: false });

        const Resetpasswordurl = `${req.protocol}://${req.get('host')}/api/v1/password/reset${reset_token}`
        const Message = `Your reset password token is : \n\n If you are not requested this mail then you can safely ignore it `
        await sendEmail({
            email: user.email,
            subject: "ecommerce web password reset query and link",
            Message,
        })
        sendMessage(res, 200, `Email send successfully to ${email} `)
    } catch (error) {
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(500, 'Internal server error'))

    }
}
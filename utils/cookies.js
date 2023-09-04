import Jwt from "jsonwebtoken";
const maxAgeInMilliseconds = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

const setCookie = (res, statuscode, message, user) => {
    const token = Jwt.sign({ id: user._id }, process.env.Jwt_secret);
    const expirationDate = new Date(Date.now() + maxAgeInMilliseconds); // Calculate expiration date

    res.status(statuscode).cookie("token", token, {
        expires: expirationDate, // Set the maxAge to 15 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production, false in development
        sameSite: 'lax', // Specify your preferred 'sameSite' attribute value
    }).json({
        message: message,
        user: user,
        token
    });
}

export default setCookie;

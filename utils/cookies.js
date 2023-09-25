import Jwt from "jsonwebtoken";
const maxAgeInMilliseconds = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

const setCookie = (res, statuscode, message, user) => {
    const token = Jwt.sign({ id: user._id }, process.env.Jwt_secret);
    const expirationDate = new Date(Date.now() + maxAgeInMilliseconds);
    res.cookie('token', token, {
        expires: expirationDate,
        httpOnly: true,
        sameSite: "None",
        secure: true
    }).json({
        Message: "cookies are send succesfully",
        user,
    })



}

export default setCookie;



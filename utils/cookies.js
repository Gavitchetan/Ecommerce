import Jwt from "jsonwebtoken"
const Cookies = (res, statuscode, message, user) => {
    const token = Jwt.sign({ id: user._id }, process.env.Jwt_secret); // Change 'process.env.process' to 'process.env.JWT_SECRET'
    res.status(statuscode).cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true, // Change 'HttpOnly' to 'httpOnly'
    }).json({
        message: message,
        user: user,
    });
}

export default Cookies
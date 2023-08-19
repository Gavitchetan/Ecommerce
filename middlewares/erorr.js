// export const ErrorsMiddleware = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 400;
//     err.message = err.message || "Internal server error";
//     if (err.name === "CastError") {
//         const message = `Resorce not found ${err.path}`
//         err = new ErrorHandler(404, message)
//     }
//     // mongose duplicate key error 
//     if (err.code === 11000) {
//         const message = "Duplicate email ";
//         err = new ErrorHandler(400, message)
//     }

//     if (err.code === "jsonwebtokenError") {
//         const message = "Json web token is invalid please try again  ";
//         err = new ErrorHandler(400, message)
//     }
//     if (err.code === "TokenExpiredError") {
//         const message = "Json web token is invalid please try again  ";
//         err = new ErrorHandler(400, message)
//     }
//     // wrong mongodb id or extra number in id 
//     res.status(err.statusCode).json({
//         success: false,
//         message: err.stack
//     });
// };



// class ErrorHandler extends Error {
//     constructor(status, message) {
//         super(message);
//         this.statusCode = status;
//     }
// }

// export default ErrorHandler;


class ErrorHandler extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
    }
}

export const ErrorsMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    if (err.name === "CastError") {
        const message = `Resource not found ${err.path}`;
        err = new ErrorHandler(404, message);
    }

    if (err.code === 11000) {
        const message = "Duplicate email";
        err = new ErrorHandler(400, message);
    }

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        const message = "JSON web token is invalid or expired, please try again";
        err = new ErrorHandler(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default ErrorHandler;

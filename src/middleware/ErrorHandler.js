const ErrorObject = require("../utils/ErrorObject");


const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorObject(400, message);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
   err = new ErrorObject(400, message);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again letter`;
   err = new ErrorObject(400, message);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired please try again letter!`;
   err = new ErrorObject(400, message);
  }

  console.log(err.statusCode,err.message)
  res.status(200).json({
    success: false,
    message: err.message,
  });
};

module.exports = {ErrorHandler}
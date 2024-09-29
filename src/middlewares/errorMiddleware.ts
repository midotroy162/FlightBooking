import ApiError from "../helper/apiError";
import { Response, Request, NextFunction } from "express";
import config from '../config';

const sendErrorForDev = (err:ApiError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err:ApiError, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
  });
};

const handleJwtInvalidsignature = () =>
  new ApiError("Invalid token,Please login again....",422);

const handleJwtExpired = () =>
  new ApiError("Expired token,Please login again....",422);

const globalError = (err:ApiError, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (config.env === "dev") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidsignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErrorForProd(err, res);
  }
};
export default globalError;
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';

    // CastError: Wrong Mongo ID
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate Key Error (MongoDB 11000)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // JsonWebTokenError: Wrong JWT Token
    if (err.name === 'JsonWebTokenError') {
        const message = `JSON Web Token is invalid. Try again`;
        err = new ErrorHandler(message, 400);
    }

    // TokenExpiredError: JWT Token Expired
    if (err.name === 'TokenExpiredError') {
        const message = `JSON Web Token is expired. Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

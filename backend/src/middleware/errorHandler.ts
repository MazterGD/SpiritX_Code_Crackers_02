import {ErrorRequestHandler, Response} from "express";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "../constants/http";
import {z} from "zod";
import ApplicationError from "../utils/appError";

const handleZodError = (res: Response, error:z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
    }))
    res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    })
}

const handleAppError = (res: Response, error: ApplicationError) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode
    })
}
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);

    if(error instanceof z.ZodError){
        return handleZodError(res, error);
    }

    if (error instanceof ApplicationError){
        return handleAppError(res, error);
    }

    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
}
export default errorHandler;
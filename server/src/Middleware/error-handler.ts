import { Request, Response , NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { logger} from "../utils/logger"

export const errorHandler = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        console.log(`Error Status: ${err.HttpStatusCode} - ${err.message} - ${JSON.stringify(err.JSON)}`);
        return res.status(err.HttpStatusCode).json(err.JSON);
    }

    logger.error(`Unhandled Error: ${err.message} - ${err.stack}`);
    return res.status(500).json({
        status: 500,
        message: "Something went wrong, please try again.",
        success: false,
    });
};

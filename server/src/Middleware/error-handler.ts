import { Request, Response , NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { logger} from "../utils/logger"

export const errorHandler = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) =>
{
    if(err instanceof CustomError)
    {
        console.log(err.HttpStatusCode);
        return res.status(err.HttpStatusCode).json(err.JSON);
    }

    logger.error("SomeThing Went Wrong That is Unhandled"+ err.message+err.stack);

    return res.status(500).json({status: 500, message: "something went wrong try again", success: false,});
};
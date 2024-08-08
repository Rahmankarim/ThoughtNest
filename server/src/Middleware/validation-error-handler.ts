import { RequestHandler } from "express";
import { requestValidators } from "../RequestValidators";
import { CustomError } from "../utils/customError";
import { statusCodes } from "../@Types/statusCodes";
import { TypeOfKeys } from "../@Types/custom-types"


const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const validateRequest = (path: TypeOfKeys<typeof requestValidators>, useJoiError = true): RequestHandler => {
    const requestValidations = requestValidators[path];

    if (!requestValidations) {
        throw new Error(`Request validators not found for the path: ${path}`);
    }

    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (!supportedMethods.includes(method)) {
            return next();
        }

        const { error, value } = requestValidations.validate(req.body, validationOptions);

        if (error) {
            const customError = new CustomError(
                "Invalid request. Please review and try again.",
                statusCodes.BadRequest,
                error.details.map(({ message, type }) => ({ [type]: message.replace(/['"]/g, "") }))
            );
            return res.status(statusCodes.ValidationError).json(useJoiError ? customError : customError);
        }

        req.body = value;
        return next();
    };
};


export default validateRequest;
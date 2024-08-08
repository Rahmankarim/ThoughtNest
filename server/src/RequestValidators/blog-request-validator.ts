import * as   Joi from "joi";

export const blogRequestValidator = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string(),
    title: Joi.string(),
    body: Joi.string(),
    coverImagePath: Joi.string()
});
import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(2).max(32).required().messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must be at most 32 characters long',
            'any.required': 'Name is required',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Must be a valid email address',
            'any.required': 'Email is required',
        }),
        password: Joi.string().min(8).required().messages({
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required',
        }),
    }),
};

export const loginUserSchema = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};
import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const userLocationsSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(6).default(6),
  }),
};

export const userUpdateSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32),
  }),
};

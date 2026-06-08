import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(1).max(200).required(),
  }),
};

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().custom(objectIdValidator).required(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(10),
  }),
};

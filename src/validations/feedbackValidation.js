import { Joi, Segments } from "celebrate";

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(1).max(200).required(),
    userName: Joi.string().min(2).max(32).required(),
  }),
};

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
    page: Joi.number().min(1).default(1),
    perPage: Joi.number().min(1).max(50).default(10),
  }),
};

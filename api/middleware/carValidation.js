const Joi = require("joi");

export const carValidation = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    file: Joi.string(),
    milage: Joi.string(),
    year: Joi.string(),
    color: Joi.string(),
    model: Joi.string(),
    categoryId: Joi.string(),
    belongsTo: Joi.string(),
  });

  const result = await Joi.validate(body, schema);
  return result;
};

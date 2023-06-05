const Joi = require("joi");

export const categoryValidation = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    belongsTo: Joi.string(),
  });

  const result = await Joi.validate(body, schema);
  return result;
};

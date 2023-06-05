const Joi = require("joi");

export const userValidation = async (body) => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.number().integer().min(3).max(5),
  });

  const result = await Joi.validate(body, schema);
  return result;
};

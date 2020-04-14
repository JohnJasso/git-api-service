const Joi = require("@hapi/joi");

function validateSearch(query) {
    const schema = Joi.object({
      term: Joi.string().required()
    });

    return schema.validate(query);
}

function validateID(params) {
  const schema = Joi.object({
    id: Joi.number()
  });

  return schema.validate(params);
}

module.exports.validateSearch = validateSearch;
module.exports.validateID = validateID;
const Joi = require('joi');

const customerValidation = (custInsert) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        names: Joi.string().required()
    });
    return schema.validate(custInsert);
}

module.exports = {customerValidation};
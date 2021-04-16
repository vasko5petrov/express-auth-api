const Joi = require('@hapi/joi');

export const registerValidation = (data) => {
    const schema = Joi.object({
        FirstName: Joi.string().min(2).max(255).required(),
        LastName: Joi.string().min(2).max(255).required(),
        Email: Joi.string().min(5).max(255).required().email(),
        Password: Joi.string().min(8).required(),
        PasswordConfirmation: Joi.any().equal(Joi.ref('Password')).required()
            .label('PasswordConfirmation').messages({ 'any.only': '{{#label}} does not match' })
    });

    return schema.validate(data, { abortEarly: false });
};
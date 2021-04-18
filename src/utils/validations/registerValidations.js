import Joi from '@hapi/joi';
import { validPassword } from './validationUtils';

export const registerValidation = (data) => {
    const schema = Joi.object({
        FirstName: Joi.string().min(2).max(128).trim().required(),
        LastName: Joi.string().min(2).max(128).trim().required(),
        Email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
        Password: Joi.string().min(8).max(128).required().custom(validPassword, 'validPassword'),
        PasswordConfirmation: Joi.valid(Joi.ref('Password')).required()
            .label('PasswordConfirmation').messages({ 'any.only': '{{#label}} does not match' })
    });

    return schema.validate(data, { abortEarly: false });
};
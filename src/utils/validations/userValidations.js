import Joi from '@hapi/joi';
import { validPassword } from './validationUtils';
import { EMAIL_VERIFICATION_TOKEN_BYTES, EMAIL_VERIFICATION_SIGNATURE_BYTES } from '../../configs';

const firstName = Joi.string().min(2).max(128).trim().required();
const lastName = Joi.string().min(2).max(128).trim().required();
const email = Joi.string().email().min(8).max(254).lowercase().trim().required();
const password = Joi.string().min(8).max(72, 'utf8').required().custom(validPassword, 'validPassword');
const passwordConfirmation = Joi.valid(Joi.ref('password')).required().label('passwordConfirmation').messages({ 'any.only': '{{#label}} does not match' });

export const registerValidation = (data) => {
    const schema = Joi.object({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    });

    return schema.validate(data, { abortEarly: false });
};

export const loginValidation = (data) => {
    const schema = Joi.object({
        email,
        password
    });

    return schema.validate(data, { abortEarly: false });
};

export const verifyEmailValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        token: Joi.string().length(EMAIL_VERIFICATION_TOKEN_BYTES).required(),
        expires: Joi.date().timestamp().required(),
        signature: Joi.string().length(EMAIL_VERIFICATION_SIGNATURE_BYTES).required()
    });

    return schema.validate(data, { abortEarly: false });
}
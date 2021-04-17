export const containsUppercase = (x) => /(?=.*[A-Z])/.test(x);
export const containsDigit = (x) => /(?=.*\d)/.test(x);

export const validPassword = (value, helpers) => {
    if (containsUppercase(value) && containsDigit(value)) {
        return value;
    }
    return helpers.error('any.invalid');
};
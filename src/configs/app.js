export const {
    NODE_ENV = 'development',
    PORT = 3044
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
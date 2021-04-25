export const {
    NODE_ENV = 'development',
    PORT = 3044,
    APP_PORT = 8080,
    APP_HOSTNAME = 'localhost',
    APP_PROTOCOL = 'http',
    APP_SECRET = 'secretString'
} = process.env;

export const IN_PROD = NODE_ENV === 'production';

export const APP_ORIGIN_URL = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;
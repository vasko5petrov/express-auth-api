import dotenv from 'dotenv';
dotenv.config();

const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_PASSWORD = 'secretString'
} = process.env;

export const REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
};
import { IN_PROD } from "./app";

const ONE_HOUR = 1000 * 60 * 60;
const EIGHT_HOURS = ONE_HOUR * 8;
const HALF_HOUR = ONE_HOUR / 2;

export const SESSION_ABSOLUTE_TIMEOUT = +(process.env.SESSION_ABSOLUTE_TIMEOUT || EIGHT_HOURS);

export const {
    SESSION_SECRET = 'secretString',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

export const SESSION_OPTIONS = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
import { IN_PROD, APP_HOSTNAME } from './app';

const {
    SMTP_HOST = 'smtp.mailtrap.io',
    SMTP_PORT = 2525,
    SMTP_USERNAME = '29c6bc385e96aa',
    SMTP_PASSWORD = '4db26863314688'
} = process.env;

export const SMTP_OPTIONS = {
    host: SMTP_HOST,
    port: +SMTP_PORT,
    secure: IN_PROD,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
};

export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;

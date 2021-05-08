import nodemailer from 'nodemailer';
import { SMTP_OPTIONS, MAIL_FROM } from './configs';

const transporter = nodemailer.createTransport(SMTP_OPTIONS);

export const sendMail = (options) => transporter.sendMail({
    ...options,
    from: MAIL_FROM
});
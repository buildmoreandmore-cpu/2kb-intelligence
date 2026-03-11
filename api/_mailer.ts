import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '2kbai@2kbco.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const FROM = `"2KB Intelligence" <${SMTP_USER}>`;

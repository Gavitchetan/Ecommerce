import nodemailer from 'nodemailer'
import { ENV } from './apifeacher.js'
export const ptsendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: ENV.SMTP_SERVICE,
        auth: {
            user: ENV.SMTP_MAIL,
            pass: ENV.SMTP_PASSWORD
        }
    })
    const MailOptions = {
        from: ENV.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(MailOptions)
}
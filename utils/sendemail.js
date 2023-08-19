
import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully to ${options.email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
};

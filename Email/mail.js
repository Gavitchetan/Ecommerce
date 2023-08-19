const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

// Define email options
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Hello from Node.js',
    text: 'This is a test email sent from Node.js using Nodemailer.'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
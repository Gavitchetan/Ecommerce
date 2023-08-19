import express from 'express'
import nodemailer from 'nodemailer'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Define the route to handle incoming requests
app.post('/send-email', (req, res) => {
    const { recipient, subject, text } = req.body;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: 'gmail',
        auth: {
            user: 'cgavit309@gmail.com', // Replace with your Gmail email
            pass: 'yjrpbuurnlpvbgtf' // Replace with your Gmail password or app-specific password
        }
    });

    // Define email options
    const mailOptions = {
        from: 'ecweb141@gmail.com',
        to: recipient,
        subject: subject,
        text: text
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).json({ message: 'Email sending failed.' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

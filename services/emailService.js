const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const sendVerificationEmail = (email, token) => {
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    return transporter.sendMail({
        to: email,
        subject: 'Email Verification',
        text: `Click this link to verify your email: ${verificationLink}`,
    });
};

const sendPasswordResetEmail = (email, token) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    return transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${resetLink}`,
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};
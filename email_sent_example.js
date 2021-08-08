'use strict';
const nodemailer = require('nodemailer');

async function main() {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        },
    });

    let info = transporter.sendMail({
        from: '',
        to: '',
        subject: '',
        text: '',
        html: ''
    });

    console.log('Email sent!');

}

main().catch(console.error);
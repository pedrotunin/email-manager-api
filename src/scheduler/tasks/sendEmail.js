'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = async function(email) {

    try {
        
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    
        let info = transporter.sendMail({
            from: email.email_from,
            to: email.email_to,
            subject: email.email_subject,
            text: (email.email_text == null ? '' : email.email_text) ,
            html: (email.email_html == null ? '' : email.email_html)
        });
    
        console.log(`Email with id=${email.email_id} sent!`);

    } catch (error) {
        throw new Error(error);
    }

}
'use strict';
const EmailQueue = require('../../api/models/EmailQueue');
const sendEmail = require('./sendEmail');

module.exports = async function(pendingEmails) {

    var email = '';
    for (var i = 0; i < pendingEmails.length; i++) {
        
        try {
        
            email = pendingEmails[i];
            const qtdSentToday = await EmailQueue.getSentToday();
            if (qtdSentToday != -1 && qtdSentToday < process.env.QTD_MAX_PER_DAY) {
                sendEmail(email);
                EmailQueue.setSent(email.email_id);
            } else {
                console.log("Daily amount of emails exceeded!");
                return;
            }

        } catch (error) {
            console.log(error);
        }
        
    }

};
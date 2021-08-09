'use strict';
const connection = require('../database/config');

const EMAIL_QUEUE_TABLE = 'email_queue';

class EmailQueue {

    async findById(email_id) {
        try {

            const email = await connection.select('*').from(EMAIL_QUEUE_TABLE).where({
                email_id
            });

            if (email.length > 0) return true;
            return false;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getById(email_id) {
        try {

            const email = await connection.select('*').from(EMAIL_QUEUE_TABLE).where({
                email_id
            });

            if (email.length > 0) return email[0];
            return undefined;
            
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getAll() {
        try {
            
            const emails = await connection.select('*').from(EMAIL_QUEUE_TABLE);

            return emails;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getNotSent() {
        try {
            
            const emails = await connection.select('*').from(EMAIL_QUEUE_TABLE).where({
                sent: false
            });

            return emails;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getSent() {
        try {
            
            const emails = await connection.select('*').from(EMAIL_QUEUE_TABLE).where({
                sent: true
            });

            return emails;

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getSentToday() {
        try {
            const query = `SELECT * FROM ${EMAIL_QUEUE_TABLE} WHERE sent=true AND sent_at >= CURRENT_DATE;`;
            const emails = await connection.raw(query);

            return emails.rows;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async getAmountSentToday() {
        try {

            const query = `SELECT COUNT(*) AS QTD FROM ${EMAIL_QUEUE_TABLE} WHERE sent=true AND sent_at >= CURRENT_DATE;`;
            const emails = await connection.raw(query);
            
            return parseInt(emails.rows[0].qtd);

        } catch (error) {
            console.log(error);
            return -1;
        }
    }

    async setSent(email_id) {
        try {
            
            const result = await connection.update({
                sent_at: new Date(),
                sent: true
            }).from(EMAIL_QUEUE_TABLE).where({
                email_id
            })

            if (result) return true;
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

    }

    async create(email) {
        const { from, to, subject, text, html } = email;

        try {

            const result = await connection.insert({
                email_from: from,
                email_to: to,
                email_subject: subject,
                email_text: text,
                email_html: html
            }).into(EMAIL_QUEUE_TABLE);

            if (result) return true;
            return false;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async delete(email_id) {
        try {

            const result = await connection.delete().from(EMAIL_QUEUE_TABLE).where({
                email_id
            });

            if (result) return true;
            return false;
            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = new EmailQueue();

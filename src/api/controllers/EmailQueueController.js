'use strict';
const { isInt } = require('validator');

const EmailQueue = require('../models/EmailQueue');
const ApiReturn = require('../views/ApiReturn');

const Validate = require('../helpers/Validate');

class EmailQueueController {

    async getAll(req, res, next) {
        const emails = await EmailQueue.getAll();


        if (emails.length == 0) {
            res.status(404);
            res.json(ApiReturn.error('No emails found.'));
            return;
        }

        res.status(200);
        res.json(ApiReturn.success('Success!', emails));
    }

    async getNotSent(req, res, next) {
        const emails = await EmailQueue.getNotSent();

        if (emails.length == 0) {
            res.status(404);
            res.json(ApiReturn.error('No emails found.'));
            return;
        }

        res.status(200);
        res.json(ApiReturn.success('Success!', emails));
    }

    async getSent(req, res, next) {
        const emails = await EmailQueue.getSent();

        if (emails.length == 0) {
            res.status(404);
            res.json(ApiReturn.error('No emails found.'));
            return;
        }

        res.status(200);
        res.json(ApiReturn.success('Success!', emails));
    }

    async getSentToday(req, res, next) {
        const qtd = await EmailQueue.getSentToday();

        if (qtd == -1) {
            res.status(500);
            res.json(ApiReturn.error('An internal error occurred!'));
            return;
        }

        res.status(200);
        res.json(ApiReturn.success('Success!', { result: qtd }));
    }

    async setSent(req, res, next) {
        const email_id = req.params.email_id;

        if (email_id == null || email_id == undefined || !isInt(String(email_id)) || await EmailQueue.findById(email_id) == false) {
            res.status(400);
            res.json(ApiReturn.error('Email ID not valid!'));
            return;
        }

        const email = await EmailQueue.getById(email_id);
        if (email != undefined && email.sent) {
            res.status(409);
            res.json(ApiReturn.error('Email already sent.'));
            return;
        }

        const result = await EmailQueue.setSent(email_id);

        if (!result) {
            res.status(500);
            res.json(ApiReturn.error('An internal error occurred!!'));
            return;
        }
    
        res.status(200);
        res.json(ApiReturn.success('Sucess!'));
    }

    async create(req, res, next) {
        const {
            from,
            to,
            subject,
            text,
            html
        } = req.body;

        const errors = await Validate.newEmail(req.body);

        if (errors.length > 0) {
            res.status(400);
            res.json(ApiReturn.error("An error occurred!!", errors));
            return;
        }

        req.body.from = req.body.from + `<${process.env.SMTP_USER}>`;

        const result = await EmailQueue.create(req.body);

        if (!result) {
            res.status(500);
            res.json(ApiReturn.error('An internal error occurred!'));
            return;
        }

        res.status(201);
        res.json(ApiReturn.success('Success!'));
    }

    async delete(req, res, next) {
        const email_id = req.params.email_id;

        if (email_id == null || email_id == undefined || !isInt(String(email_id)) || await EmailQueue.findById(email_id) == false) {
            res.status(400);
            res.json(ApiReturn.error('Email ID not valid!'));
            return;
        }

        const result = await EmailQueue.delete(email_id);

        if (!result) {
            res.status(500);
            res.json(ApiReturn.error('An internal error occurred!!'));
            return;
        }
    
        res.status(200);
        res.json(ApiReturn.success('Sucess!'));
    }

}

module.exports = new EmailQueueController();
'use strict';
require('dotenv').config();

const bcrypt = require('bcryptjs');
const salt = parseInt(process.env.BCRYPT_SALT);

const Secret = require('../models/Secret');
const ApiReturn = require('../views/ApiReturn');

class SecretController {

    async createSecret(req, res, next) {

        const { secret } = req.body;

        if (secret == undefined || secret == null || secret.length == 0) {
            res.status(400);
            res.json(ApiReturn.error("No secret provided!"));
            return;
        }

        const newSecret = await Secret.verifySecret(secret);

        if (newSecret) {
            res.status(403);
            res.json(ApiReturn.error('A secret already exists!'));
            return;
        }

        const hashedSecret = await bcrypt.hash(secret, salt);

        const result = await Secret.createSecret(hashedSecret);

        res.status(200);
        res.json(ApiReturn.success('Success!'));

    }

}

module.exports = new SecretController();
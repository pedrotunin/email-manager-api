'use strict';
require('dotenv').config();

const ApiReturn = require('../views/ApiReturn');
const User = require('../models/User');
const Validate = require('../helpers/Validate');
const Secret = require('../models/Secret');

const bcrypt = require('bcryptjs');
const salt = parseInt(process.env.BCRYPT_SALT);

const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

class UserController {

    async create(req, res, next) {

        const {
            email,
            password,
            secret
        } = req.body;

        const hashedSecret = await Secret.getSecret();

        if (hashedSecret == null || hashedSecret == undefined) {
            res.status(403);
            res.json(ApiReturn.error('There is no secret in the database.'))
            return;
        }

        const compare = await bcrypt.compare(secret, hashedSecret.secret);

        if (!compare) {
            res.status(401);
            res.json(ApiReturn.error('The secret is not correct.'));
            return;
        }

        if (email != undefined && await User.findByEmail(email)) {
            res.status(409);
            res.json(ApiReturn.error("The e-mail already exists in our database!"));
            return;
        }

        const hash = await bcrypt.hash(password, salt);

        const user = {
            email,
            pwd: hash
        };

        const newUser = await User.create(user);

        if (newUser == undefined) {
            res.status(500);
            res.json(ApiReturn.error("An internal error occurred!"));
            return;
        }

        res.status(201);
        res.json(ApiReturn.success("User created!"))
        return;

    }

    async login(req, res, next) {

        const { email, password } = req.body;

        const errors = await Validate.validateLogin(email, password);

        if (errors.length > 0) {
            res.status(400);
            res.json(ApiReturn.error("Some errors occurred!", errors));
            return;
        }

        const user = await User.findByEmail(email);

        if (user == undefined) {
            res.status(406);
            res.json(ApiReturn.error("E-mail or password incorrect!"));
            return;
        }

        const comparePasswords = await bcrypt.compare(password, user.pwd);

        if (!comparePasswords) {
            res.status(406);
            res.json(ApiReturn.error("E-mail or password incorrect!"));
            return;
        }

        const token = jwt.sign({
            id: user.id, 
            email: user.email,
        }, jwt_secret, { expiresIn: `${60 * 60 * 1000}ms` });

        res.status(200);
        res.json(ApiReturn.success("Successfully logged!", { token: token }));

    }

}

module.exports = new UserController();
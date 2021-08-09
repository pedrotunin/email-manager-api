'use strict';
const express = require('express');
const router = express.Router();

const EmailQueueController = require('../controllers/EmailQueueController');
const UserController = require('../controllers/UserController');
const SecretController = require('../controllers/SecretController');

const LoggedMiddleware = require('../middlewares/LoggedMiddleware');

// SecretController
    router.post('/secret', SecretController.createSecret);

// UserController
    router.post('/user', UserController.create);
    router.post('/user/login', UserController.login);

// EmailQueueController
    router.post('/email', LoggedMiddleware, EmailQueueController.create);
    router.get('/email', LoggedMiddleware, EmailQueueController.getAll);
    router.get('/email/sent', LoggedMiddleware, EmailQueueController.getSent);
    router.get('/email/notSent', LoggedMiddleware, EmailQueueController.getNotSent);
    router.get('/email/amountSentToday', LoggedMiddleware, EmailQueueController.getSentToday);
    router.delete('/email/:email_id', LoggedMiddleware, EmailQueueController.delete);
    router.put('/email/:email_id', LoggedMiddleware, EmailQueueController.setSent);

module.exports = router;
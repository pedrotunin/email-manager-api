'use strict';
const express = require('express');
const router = express.Router();

const EmailQueueController = require('../controllers/EmailQueueController');

router.post('/email', EmailQueueController.create);

router.get('/email', EmailQueueController.getAll);
router.get('/email/sent', EmailQueueController.getSent);
router.get('/email/notSent', EmailQueueController.getNotSent);
router.get('/email/sentToday', EmailQueueController.getSentToday);

router.delete('/email/:email_id', EmailQueueController.delete);
router.put('/email/:email_id', EmailQueueController.setSent);

module.exports = router;
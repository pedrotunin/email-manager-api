'use strict';
const EmailQueue = require('../../api/models/EmailQueue');
const handlePedingEmails = require('./handlePedingEmails');

module.exports = async function() {

    const pendingEmails = await EmailQueue.getNotSent();

    if (pendingEmails.length > 0)
        handlePedingEmails(pendingEmails);

};
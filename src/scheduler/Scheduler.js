'use strict';
const { CronJob } = require('cron');
const verifyPendingEmails = require('./tasks/verifyPendingEmails')

const CRON_STRING = '0/30 * * * * *';

class Scheduler {

    async start() {
        console.log(`Scheduler started at ${new Date()}`);
        new CronJob(CRON_STRING, () => {
            console.log(`Scheduler ran at ${new Date()}.`);
            verifyPendingEmails();
        }, null, true, 'America/Sao_Paulo');
    }

}

module.exports = new Scheduler();
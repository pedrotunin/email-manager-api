'use strict';
const { CronJob, CronTime } = require('cron');

const job = new CronJob('* * * * * *', () => {
    console.log('You will see this message every second');
}, null, true, 'America/Sao_Paulo');

let a = 0;
for (let i = 0; i < 1000000; i++) {
    a = a + 1;
}

console.log('ola')

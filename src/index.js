'use strict';
require('dotenv').config();

// Setting up Express
const express = require('express');
const app = express();
const router = require('./api/routes/routes');

// Setting up Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

// Setting up Emails Scheduler
const Scheduler = require('./scheduler/Scheduler');
Scheduler.start();

app.use()

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}!`);
});
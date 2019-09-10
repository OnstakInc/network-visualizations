const express = require('express');

const app = express();

require('../scripts/initialize-db');

require('./startup/bootstrap')(app);
require('./startup/register-database')(app);
require('./startup/register-controllers')(app);
require('./startup/register-handlers')(app);

module.exports = app;

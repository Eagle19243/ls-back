const express      = require('express');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const app          = express();
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use(errorHandler);

module.exports = app;

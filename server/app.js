const express = require('express');
const path = require('path');
const logger = require('morgan');

const questionRouter = require('./routes/question');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.use('/api/question', questionRouter);

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) => res.sendFile(path.resolve('..', 'client', 'build', 'index.html')));

module.exports = app;

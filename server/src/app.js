const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Custom modules
const utils = require('./utils');

/**
 * Routes are defined in separate files in the `/routes` directory for better organization. Ideally, the `questionRouter` woul be split
 * in two (`questionRouter`, `answerRouter`). The idea is to have one router per resource (so for example `user` would get it's own
 * `userRouter`)
 */
const questionRouter = require('./routes/question');

const port = utils.normalizePort(process.env.port || '4000');
const databaseUrl = process.env.MONGO_URL || 'mongodb://localhost/undefined_io';
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client/build')));

// Question & Answer routes
app.use('/api/question', questionRouter);

/**
 * Let non-api requests be handled by Reach router
 */
app.get('*', (req, res) => res.sendFile(path.resolve('..', 'client', 'build', 'index.html')));

// Yoinked from https://github.com/kdorland/kittens_mern/blob/master/server/app.js
mongoose
    .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(port);

        console.log(`undefined.io server running on port ${port}`);
    })
    .catch((error) => console.error(error));

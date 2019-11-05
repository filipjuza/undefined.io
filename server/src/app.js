const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Custom modules
const utils = require('./utils');

// Routes
const questionRouter = require('./routes/question');

const port = utils.normalizePort(process.env.port || '3000');
const databaseUrl = process.env.MONGO_URL || 'mongodb://localhost/undefined_io';
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client/build')));

app.use('/api/question', questionRouter);

// app.use((err, req, res) => {
//     console.error(err.message);

//     if (!err.statusCode) {
//         // eslint-disable-next-line no-param-reassign
//         err.statusCode = 500;
//     }

//     res.status(err.statusCode).send(err.message);
// });

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) => res.sendFile(path.resolve('..', 'client', 'build', 'index.html')));

mongoose
    .connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // await DAL.bootstrap();
        app.listen(port);

        console.log(`undefined.io server running on port ${port}`);
    })
    .catch((error) => console.error(error));

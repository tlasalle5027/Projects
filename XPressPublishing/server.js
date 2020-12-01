const apiRouter = require('./api/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');

//Create an instance of an Express app
const app = express();

//Variable for port number
const PORT = process.env.PORT || 4000;

//Setting up dependency usages
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());
app.use(morgan('dev'));

//Set up API router
app.use('/api', apiRouter);

//Listen on the provided port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

module.exports = app;
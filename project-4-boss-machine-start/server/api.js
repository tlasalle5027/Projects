const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minions');
const ideaRouter = require('./ideas');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);



module.exports = apiRouter;

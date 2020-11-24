const meetingRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');



module.exports = meetingRouter;
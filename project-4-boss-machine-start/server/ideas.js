const ideaRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

ideaRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideaRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
})

module.exports = ideaRouter;
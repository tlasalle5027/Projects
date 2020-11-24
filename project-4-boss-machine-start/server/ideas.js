const ideaRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideaRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideaRouter.get('/:ideaid', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaid);
    if(idea){
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

ideaRouter.put('/:ideaid', (req, res, next) => {
    const idea = updateInstanceInDatabase('ideas', req.body);
    if(idea){
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

ideaRouter.delete('/:ideaid', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaid);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = ideaRouter;
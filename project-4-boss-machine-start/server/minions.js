const minionRouter = require('express').Router();

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionRouter.get('/:minionid', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionid);
    if(minion){
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

minionRouter.put('/:minionid', (req, res, next) => {
    const minion = updateInstanceInDatabase('minions', req.body);
    if(minion){
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

minionRouter.delete('/:minionid', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionid);
    if(deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});


module.exports = minionRouter;
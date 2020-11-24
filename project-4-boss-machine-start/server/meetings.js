const meetingRouter = require('express').Router();

const { 
    addToDatabase,
    createMeeting,
    deleteAllFromDatabase,
    getAllFromDatabase,
} = require('./db');

meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if(newMeeting){
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send();
    }

});

meetingRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingRouter;
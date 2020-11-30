const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const artistRouter = express.Router();

artistRouter.param('artistId', (req, res, next, artistId) => {
    const sql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const values = {$artistId: artistId};
    db.get(sql, values, (err, artist) => {
        if(err){
            next(err);
        } else {
            if(artist){
                req.artist = artist;
                next();
            } else {
                res.sendStatus(404);
            }
        }
    });
});

//Get all Artists
artistRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', (err, artists) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: artists});
        }
    });
});

//Get a single artist by id
artistRouter.get('/:artistId', (req, res, next) => {
    res.status(200).json({artist: req.artist});
})

module.exports = artistRouter;
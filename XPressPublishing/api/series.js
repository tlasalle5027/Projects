const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const seriesRouter = express.Router();
const issueRouter = require('./issues');

seriesRouter.use('/:seriesId/issues', issueRouter);

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    const sql = 'SELECT * FROM Series WHERE Series.id = $seriesId';
    const values = {$seriesId: seriesId};
    db.get(sql, values, (err, series) => {
        if(err){
            next(err);
        } else {
            if(series){
                req.series = series;
                next();
            } else {
                res.sendStatus(404);
            }
        }
    });
});

seriesRouter.get('/', (req, res, next) => {
    db.all("SELECT * FROM Series", (err, series) => {
        if(err){
            next(err);
        } else {
            res.status(200).json({series: series});
        }

    });

});

seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({series: req.series});
});

seriesRouter.post('/', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.description;

    if(!name || !description ){
        return res.sendStatus(400);
    }

    const sql = 'INSERT INTO Series (name, description) VALUES ($name, $description)';
    const values = {
      $name: name,
      $description: description,
    };
     
    db.run(sql, values, function(err) {
        if(err){
            next(err);
        } else {            
            db.get(`SELECT * FROM Series WHERE id=${this.lastID}`, function(err, series){
                res.status(201).send({series: series});
            });
        }
    });
});

seriesRouter.put('/:seriesId', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.description;

    if(!name || !description ){
        return res.sendStatus(400);
    }

    const sql = 'UPDATE Series SET name = $name, description = $description WHERE Series.id = $seriesId';
    const values = {
        $name: name,
        $description: description,
        $seriesId: req.params.seriesId
    };
 
    db.run(sql, values, (err) => {
        if(err){
            next(err);
        } else {
            db.get(`SELECT * FROM Series WHERE id=${req.params.seriesId}`, function(err, series){
                res.status(200).send({series: series});
            });
        }

    });    
    
});

seriesRouter.delete('/:seriesId', (req, res, next) => {
    const issueSql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const issueValues = {$seriesId: req.params.seriesId};
    db.get(issueSql, issueValues, (error, issue) => {
      if (error) {
        next(error);
      } else if (issue) {
        res.sendStatus(400);
      } else {
        const deleteSql = 'DELETE FROM Series WHERE Series.id = $seriesId';
        const deleteValues = {$seriesId: req.params.seriesId};
  
        db.run(deleteSql, deleteValues, (error) => {
          if (error) {
            next(error);
          } else {
            res.sendStatus(204);
          }
        });
      }
    });
  });

module.exports = seriesRouter;
const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const issueRouter = express.Router({mergeParams: true});

issueRouter.param('issueId', (req, res, next, issueId) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.id = $issueId';
    const values = {$issueId: issueId};
    db.get(sql, values, (err, issue) => {
        if(err){
            next(err);
        } else {
            if(issue){
                req.issue = issue;
                next();
            } else {
                res.sendStatus(404);
            }
        }
    });
});

issueRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const values = { $seriesId: req.params.seriesId};
    db.all(sql, values, (error, issues) => {
      if (error) {
        next(error);
      } else {
        res.status(200).json({issues: issues});
      }
    });
});

issueRouter.post('/', (req, res, next) => {
    const name = req.body.issue.name;
    const issueNumber = req.body.issue.issueNumber;
    const publicationDate = req.body.issue.publicationDate;
    const artistId = req.body.issue.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = {$artistId: artistId};
    db.get(artistSql, artistValues, (error, artist) => {
      if (error) {
        next(error);
      } else {
        if (!name || !issueNumber || !publicationDate || !artist) {
          return res.sendStatus(400);
        }
  
        const sql = 'INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)' +
            'VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)';
        const values = {
          $name: name,
          $issueNumber: issueNumber,
          $publicationDate: publicationDate,
          $artistId: artistId,
          $seriesId: req.params.seriesId
        };
  
        db.run(sql, values, function(error) {
          if (error) {
            next(error);
          } else {
            db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`,
              (error, issue) => {
                res.status(201).json({issue: issue});
              });
          }
        });
      }
    });
});

issueRouter.put('/:issueId', (req, res, next) => {
    const name = req.body.issue.name;
    const issueNumber = req.body.issue.issueNumber;
    const publicationDate = req.body.issue.publicationDate;
    const artistId = req.body.issue.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = {$artistId: artistId};
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error);
        } else {
            if (!name || !issueNumber || !publicationDate || !artist) {
                return res.sendStatus(400);
            }

            const sql = 'UPDATE Issue SET name = $name, issue_number = $issueNumber, ' +
            'publication_date = $publicationDate, artist_id = $artistId ' +
            'WHERE Issue.id = $issueId';
            const values = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $issueId: req.params.issueId
            };

            db.run(sql, values, function(error) {
                if (error) {
                  next(error);
                } else {
                    db.get(`SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`,
                    (error, issue) => {
                        res.status(200).json({issue: issue});
                    });
                }
            });
        }
    });
});

issueRouter.delete('/:issueId', (req, res, next) => {
    const sql = 'DELETE FROM Issue WHERE Issue.id = $issueId';
    const values = {$issueId: req.params.issueId};
  
    db.run(sql, values, (error) => {
      if (error) {
        next(error);
      } else {
        res.sendStatus(204);
      }
    });
  });

module.exports = issueRouter;
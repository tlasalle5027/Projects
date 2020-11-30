const sqlite3 = require('sqlite3');

//Open the provided database
const db = new sqlite3.Database('./database.sqlite');

//Create an Artist Table if it does not exist
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Artist");
    db.run('CREATE TABLE IF NOT EXISTS `Artist` ( ' +
    '`id` INTEGER NOT NULL, ' +
    '`name` TEXT NOT NULL, ' +
    '`date_of_birth` TEXT NOT NULL, ' +
    '`biography` TEXT NOT NULL, ' +
    '`is_currently_employed` INTEGER NOT NULL DEFAULT 1, ' +
    'PRIMARY KEY(`id`) )');

})

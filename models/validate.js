var model = module.exports;
var r = require('rethinkdb');
var config = require('../config');

var VALIDATE_TABLE = 'validate';

model.setup = function (callback) {
    console.log("Setting up RethinkDB...");
    
    r.connect(config.database).then(function(conn) {
        // Does the database exist?
        r.dbCreate(config.database.db).run(conn).then(function(result) {
            console.log("Database created...");
        }).error(function(error) {
            console.log("Database already created...");
        }).finally(function() {
            // Does the table exist?
            r.table(VALIDATE_TABLE).limit(1).run(conn, function(error, cursor) {
                var promise;
                if (error) {
                    console.log("Creating table...");
                    promise = r.tableCreate(VALIDATE_TABLE).run(conn);
                } else {    
                    promise = cursor.toArray();
                }

                // The table exists, setup the update listener
                promise.then(function(result) {
                    console.log("Setting up update listener...");
                    r.table(VALIDATE_TABLE).filter(r.row('data_begin').eq(null).or(r.row('data_end').eq(null))).changes().run(conn).then(function(cursor) {
                        cursor.each(function(error, row) {
                            callback(row);
                        });
                    });
                }).error(function(error) {
                    throw error;
                });
            });
        });
    }).error(function(error) {
        throw error;
    });
}

model.getAll = function (callback) {
    r.connect(config.database).then(function(conn) {
        r.table(VALIDATE_TABLE).filter(r.row('data_begin').eq(null).or(r.row('data_end').eq(null))).run(conn).then(function(cursor) {
            cursor.toArray(function(error, results) {
                if (error) throw error;
                callback(results);
            });
        }).error(function(error) {
            throw error;
        });
    }).error(function(error) {
        throw error;
    });
}
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://qwerty92:qwerty92#@ds147711.mlab.com:47711/heroku_gfw8418h';

const db = require('mongoose');

db.connect(url, { useMongoClient: true });
db.Promise = global.Promise; 

module.exports = db;

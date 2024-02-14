const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI = process.env.MONGO_URI;

let database;

function init(callback) {
  if (database) {
    return callback(null, database);
  }
  MongoClient.connect(URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((error) => {
      callback(error);
    });
}

function getDatabase() {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
}

module.exports = {
    init,
    getDatabase
};
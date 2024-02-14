const Id = require('mongodb').ObjectId;
const mongodb = require('../db/connect');
const DB = "wdd-341";
const COLLECTION = "contacts";

const getAll = async (req, res, next) => {
    const result = await mongodb.getDatabase().db(DB).collection(COLLECTION).find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getOne = async (req, res, next) => {
    const userId = new Id(req.params.id);
    const result = await mongodb.getDatabase().db(DB).collection(COLLECTION).find({_id: userId});

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = {
    getAll,
    getOne
};
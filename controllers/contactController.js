const Id = require("mongodb").ObjectId;
const mongodb = require("../db/connect");
const DB = "wdd-341";
const COLLECTION = "contacts";

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(DB)
    .collection(COLLECTION)
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOne = async (req, res) => {
  const userId = new Id(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DB)
    .collection(COLLECTION)
    .find({ _id: userId });

  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    dateOfBirth: req.body.dateOfBirth,
  };
  const response = await mongodb
    .getDatabase()
    .db(DB)
    .collection(COLLECTION)
    .insertOne(newContact);
  res.status(201).json(response);
};

const updateContact = async (req, res) => {
  const userId = new Id(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    dateOfBirth: req.body.dateOfBirth,
  };
  const response = await mongodb
    .getDatabase()
    .db(DB)
    .collection(COLLECTION)
    .replaceOne({ _id: userId }, updatedContact);
  res.status(204).send();
};

const deleteContact = async (req, res) => {
  const userId = new Id(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db(DB)
    .collection(COLLECTION)
    .deleteOne({ _id: userId }, true);
  res.status(204).send();
};

module.exports = {
  getAll,
  getOne,
  createContact,
  updateContact,
  deleteContact,
};

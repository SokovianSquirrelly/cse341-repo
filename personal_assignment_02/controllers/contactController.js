const mongodb = require("../data/database");

const getContacts = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('content-type', 'application/json');
        res.status(200).json(contacts);
    })
}
const express = require('express');
const router = express.Router();
const contactList = require("../controllers/contactController");

router.get("/", contactList.getAll);

router.get('/:id', contactList.getOne);

module.exports = router;
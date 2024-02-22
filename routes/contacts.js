const express = require("express");
const router = express.Router();
const contactList = require("../controllers/contactController");

router.get("/", contactList.getAll);

router.get("/:id", contactList.getOne);

router.post("/", contactList.createContact);

router.put("/:id", contactList.updateContact);

router.delete("/:id", contactList.deleteContact);

module.exports = router;

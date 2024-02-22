const express = require("express");
const db = require("./db/connect");

const port = process.env.PORT || 8080;
const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes/contacts"));

db.init((error, db) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

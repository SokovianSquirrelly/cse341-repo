const express = require("express");
const cors = require("cors");
const db = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger-output.json");

const port = process.env.PORT || 8080;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app
  .use(cors())
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

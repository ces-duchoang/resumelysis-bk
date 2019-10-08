const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const config = require("./config");
const Logger = require("./middleware/Logger");
const db = mongoose.connection;

//Global middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.ENABLE_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(Logger);

//Database connect
mongoose.connect(config.DB_URL, { useNewUrlParser: true });
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected in " + config.MODE);
});

//Route configure
//Enable prefight method
app.options("*", cors({ origin: config.ENABLE_URL }));
//Default index route
app.get("/", (req, res) => {
  res.send("hello world");
});

//Set route
app.use("/api", routes);

module.exports = app;

require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 1000;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const socket = require("socket.io");

const {} = require("./bin/helpers/dbHelpers.js");

// PG database client/connection setup
const db = require("./db/db");
db.connect();

app.set("view engine", "ejs");
app.use(express.json({ extended: true }));

app.use(express.static(__dirname + "/public"));

// ***** routes *****
const apiRoutes = require("./routes/api");
const defaultRoutes = require("./routes/default");
app.use("/api", apiRoutes);
app.use("/home", defaultRoutes);

const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
const io = socket(server);

io.on("connection", socket => {});

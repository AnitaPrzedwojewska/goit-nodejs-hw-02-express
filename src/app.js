const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require('path');

const { PUBLIC_DIR } = require('./constants/constants.js');
const jwtStrategy = require('./config/jwt');

const app = express();

app.use(express.static(path.join(__dirname, "../", PUBLIC_DIR)));

const contactsRouter = require("./api/contacts-api");
const usersRouter = require("./api/users-api");

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

jwtStrategy();

app.use("/api", contactsRouter);
app.use("/api", usersRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({
      status: "404 Not found",
      message: `Not found - ${req.path}`
    });
});

app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      status: "500 Internal Server Error ",
      message: `Something wrong - ${err}`
    });
});

module.exports = app;

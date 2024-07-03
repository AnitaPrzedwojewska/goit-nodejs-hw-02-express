const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const contactsRouter = require("./api/contacts");

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}`});
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: `Something wrong - ${err.message}` });
});

module.exports = app;

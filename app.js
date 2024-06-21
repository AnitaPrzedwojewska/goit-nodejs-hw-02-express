const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const contactsRouter = require("./routes/api/contacts");

const app = express();

// const fs = require("fs");
// const path = require("path");
// const accessLogFile = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(logger('dev'));
// app.use(logger('dev'), { stream: accessLogFile });
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

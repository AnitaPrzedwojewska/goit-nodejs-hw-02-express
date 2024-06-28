const app = require('./app');
const mongoose = require("mongoose");

require("dotenv").config();
const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful.");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000.")
    })

  } catch (error) {
    console.log(error);
    process.exit();
  }
};

startServer();


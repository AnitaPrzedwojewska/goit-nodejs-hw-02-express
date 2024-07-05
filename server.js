const app = require('./src/app');
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { DB_HOST: URI_DB } = process.env;

const connection = mongoose.connect(URI_DB);

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}.`)
    })
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

startServer();


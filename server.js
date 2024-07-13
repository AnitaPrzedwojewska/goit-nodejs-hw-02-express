const path = require('path');
const app = require('./src/app');
const mongoose = require("mongoose");

const {
  setupFolder
} = require('./src/utils/images-utils');

const { PUBLIC_DIR, AVATARS_DIR, TEMP_DIR } = require('./src/constants/constants');

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { DB_HOST: URI_DB } = process.env;

const connection = mongoose.connect(URI_DB);

const publicDir = path.join(process.cwd(), PUBLIC_DIR);
const avatarsDir = path.join(process.cwd(), AVATARS_DIR);
const tempDir = path.join(process.cwd(), TEMP_DIR);

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful.");
    app.listen(PORT, async () => {
      console.log(`Server running. Use our API on port: ${PORT}.`);
      await setupFolder(publicDir);
      await setupFolder(avatarsDir);
      await setupFolder(tempDir);
    })
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

startServer();


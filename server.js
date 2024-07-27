const path = require('path');

const db = require('./src/db/db');
const app = require('./src/app');
const { setupFolder } = require('./src/utils/images-utils');

const { DB_HOST, PUBLIC_DIR, AVATARS_DIR, TEMP_DIR } = require('./src/constants/constants');

const { PORT } = require("./src/constants/constants.js") || 3000;

const publicDir = path.join(process.cwd(), PUBLIC_DIR);
const avatarsDir = path.join(process.cwd(), AVATARS_DIR);
const tempDir = path.join(process.cwd(), TEMP_DIR);

const startServer = async () => {
  try {
    await db.connect(DB_HOST);
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

const multer = require('multer');
const path = require('path');
// const fs = require("fs").promises;

const {
  TEMP_DIR,
  IMAGE_EXT_LIST,
  IMAGE_MIMETYPE_LIST,
} = require("../../constants/constants");

// const tempDir = path.join(process.cwd(),TEMP_DIR);
const tempDir = path.join(__dirname, `../../../${TEMP_DIR}`);

// const { isImageAndTransform } = require('../../utils/images-utils');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log('upload - file: ', file);
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !IMAGE_EXT_LIST.includes(extension) ||
      !IMAGE_MIMETYPE_LIST.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

const validateUserAvatar = async (req, res, next) => {
  console.log('request: ', req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file" });
  }

  res.json(req.file);
}

module.exports = { upload, validateUserAvatar };
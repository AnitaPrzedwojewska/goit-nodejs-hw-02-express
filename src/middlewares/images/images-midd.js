const multer = require('multer');
const path = require('path');
const fs = require("fs").promises;

const {
  TEMP_DIR,
  AVATARS_DIR,
  IMAGE_EXT_LIST,
  IMAGE_MIMETYPE_LIST,
} = require("../../constants/constants");

const { isImageAndTransform } = require('../../utils/images-utils');

const tempDir = path.join(__dirname, `../../../${TEMP_DIR}`);
const storageDir = path.join(__dirname, `../../../${AVATARS_DIR}`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// upload ==================================================
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !IMAGE_EXT_LIST.includes(extension) ||
      !IMAGE_MIMETYPE_LIST.includes(mimetype)
    ) {
      return cb(new Error('No image file'), false);
    }
    return cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

// validateAndTransformUserAvatar ==================================================
const validateAndTransformUserAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file" });
  }

  const userId = req.user._id;
  const { path: tempFilePath } = req.file;

  const isValidAndTransform = await isImageAndTransform(tempFilePath);
  if (!isValidAndTransform) {
    await fs.unlink(tempFilePath);
    return res.status(400).json({ message: "File is not an image" });
  }

  const extension = path.extname(tempFilePath);
  const fileName = `img_${userId}${extension}`;
  const filePath = path.join(storageDir, fileName);

  try {
    await fs.rename(tempFilePath, filePath);

    req.file.destination = storageDir;
    req.file.path = filePath;
    req.file.filename = fileName;
    next();

  } catch (error) {
    await fs.unlink(tempFilePath);
    return next(error);
  }
};

module.exports = { upload, validateAndTransformUserAvatar };
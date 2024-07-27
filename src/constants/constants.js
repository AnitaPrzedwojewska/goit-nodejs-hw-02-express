require("dotenv").config();

const BASE_URL = 'localhost:3000';

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// data for data connection
const DB_HOST = process.env.DB_HOST;

// limit of contacts per page in API
const LIMIT = 5;

// temporary and destination folder for images
const PUBLIC_DIR = "public";
const AVATARS_DIR = "public/avatars";
const TEMP_DIR = "temp";
// max size of images
const AVATAR_SIZE = 250;
// white lists of images
const IMAGE_EXT_LIST = [".jpg", ".jpeg", ".png", ".gif"];
const IMAGE_MIMETYPE_LIST = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];

// data for send email
const MAIL_USER = process.env.MAILGUN_USER;
const MAIL_PASS = process.env.MAILGUN_PASS;
const MAIL_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAIL_API_KEY = process.env.MAILGUN_API_KEY;
const MAIL_HOST = 'smtp.mailgun.org';
// const MAIL_PORT = 587;
// const MAIL_SECURE = false;
const MAIL_PORT = 465;
const MAIL_SECURE = true;
const TLS_OPTIONS = { rejectUnauthorized: true };

const EMAIL_FROM = '"Contacts Verifier" <verify-contacts@gmail.com>';
const EMAIL_VERIFY_TITLE = "Verify email address";

module.exports = {
  BASE_URL,

  DB_HOST,
  PORT,
  JWT_SECRET,
  LIMIT,

  PUBLIC_DIR,
  AVATARS_DIR,
  TEMP_DIR,
  AVATAR_SIZE,
  IMAGE_EXT_LIST,
  IMAGE_MIMETYPE_LIST,

  MAIL_USER,
  MAIL_PASS,
  MAIL_DOMAIN,
  MAIL_API_KEY,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  TLS_OPTIONS,

  EMAIL_FROM,
  EMAIL_VERIFY_TITLE,
};

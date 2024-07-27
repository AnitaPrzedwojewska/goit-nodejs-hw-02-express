const nodemailer = require('nodemailer');
const mt = require("nodemailer-mailgun-transport");

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASS,
  MAIL_DOMAIN,
  MAIL_API_KEY,
  TLS_OPTIONS,
} = require("../constants/constants");

const transporterConfigSMTP = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE,
  auth: {
    user: MAIL_USER,
    password: MAIL_PASS,
  },
  tls: TLS_OPTIONS,
};

const transporterSMTP = nodemailer.createTransport(transporterConfigSMTP);

const transporterConfigAPI = {
  auth: {
    domain: MAIL_DOMAIN,
    api_key: MAIL_API_KEY,
  },
  tls: TLS_OPTIONS,
};

const transporterAPI = nodemailer.createTransport(mt(transporterConfigAPI));

module.exports = { transporterSMTP, transporterAPI };

const { transporterAPI } = require('../config/nodemailer');
const {
  BASE_URL,
  EMAIL_FROM,
  EMAIL_VERIFY_TITLE,
} = require("../constants/constants");

const verifyEmailToHtml = (token) => {
  return `<p><a href='http://${BASE_URL}/api/users/verify/${token}'>Click for verify your email address</a></p>`;
}

const sendVerifyEmail = async (sendTo, token) => {
  try {
    const mailOptions = {
      from: EMAIL_FROM,
      to: sendTo,
      subject: EMAIL_VERIFY_TITLE,
      html: verifyEmailToHtml(token),
    };
    const result = await transporterAPI.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { sendVerifyEmail };

const mongoose = require('mongoose');

const regexpName = /([A-Z])\w+((\s)?([A-Z]\w+))*/;
const regexpEmail = /^[a-zA-Z0-9_.±]+@([\w-]+.)+[\w-]{2,4}$/;
const regexpPhone = /^\+?\d{2,3}(-?\s? ?\d+)*$/;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 30,
    validate: [regexpName, "This is not a valid name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    validate: [regexpEmail, "This is not a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
    validate: [regexpPhone, "This is not a valid phone number"],
  },
  favorite: {
    type: Boolean,
    default: false,
  }
},
{
  versionKey: false,
  timeStamps: true
});

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;
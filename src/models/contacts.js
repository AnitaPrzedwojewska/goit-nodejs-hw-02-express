const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean }
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Contact = mongoose.model('contact', contactSchema, 'contacts');

module.exports = Contact;
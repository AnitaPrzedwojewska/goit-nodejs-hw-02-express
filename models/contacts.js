const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 30,
    validate: {
      validator: function (value) {
        const regexp = /([A-Z])\w+((\s)?([A-Z]\w+))*/;
        return regexp.test(value);
      },
      message: props => `${props.value} is not a valid name!`
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (value) {
        const regexp = /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/;
        return regexp.test(value);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (value) {
        const regexp = /^\+?\d{2,3}(-?\s? ?\d+)*$/;
        return regexp.test(value);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },
  favorite: {
    type: Boolean,
    default: false
  }
  // ,
  // versionKey: false,
  // timeStamps: true
})

// contactSchema.static.getAll = function () {
//   return Task.find().lean();
// }

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;
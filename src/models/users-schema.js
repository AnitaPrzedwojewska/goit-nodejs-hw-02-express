const { Schema, model } = require("mongoose");
const bCrypt = require("bcrypt");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.setHashPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bCrypt.compare(password, this.password);
};

const User = model("user", userSchema, "users");

module.exports = User;

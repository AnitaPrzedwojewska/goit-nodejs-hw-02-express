const User = require("../models/users-schema");

const getUser = ({ key: value }) => {
  return User.findOne({ key: value });
};

const setUserKey = (_id, key) => {
  return User.findOneAndUpdate(
    { _id: _id },
    key,
    {
      new: true,
      validateBeforeSave: true,
      runValidators: true,
      context: "query",
    }
  );
}

module.exports = {
  getUser, setUserKey
};

const User = require("../models/users-schema");

const getUser = (filter) => {
  return User.findOne(filter);
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

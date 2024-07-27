const LIMIT = require("../../constants/constants.js");
const { fetchAllContacts } = require("../../services/contacts-services");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = LIMIT, favorite } = req.query;
    const filter = { owner: req.user._id };
    if (favorite) {
      filter.favorite = favorite;
    }
    const contacts = await fetchAllContacts(page, limit, filter);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;

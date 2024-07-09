const passport = require('passport');

const { fetchContact } = require('../../services/contacts-services');

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const authOwn = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const filter = { _id: contactId };
    const contact = await fetchContact(filter);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    } else {
      if (String(contact.owner) !== String(req.user._id)) {
        return res.status(401).json({ message: "Unauthorized operation" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { auth, authOwn };

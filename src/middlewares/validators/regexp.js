const regexpName = /([A-Z])\w+((\s)?([A-Z]\w+))*/;
const regexpPhone = /^\+?\d{2,3}(-?\s? ?\d+)*$/;

module.exports = { regexpName, regexpPhone };
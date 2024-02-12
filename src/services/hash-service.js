const bcrypt = require("bcryptjs");

exports.hash = (input) => bcrypt.hash(input, 12); //12 คือความเร็วในการ hash
exports.compare = (plainText, hashValue) =>
  bcrypt.compare(plainText, hashValue);

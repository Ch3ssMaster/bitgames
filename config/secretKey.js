const rand = require("random-key");
const secretKey = rand.generate();

module.exports = { secretKey };

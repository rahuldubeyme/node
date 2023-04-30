const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

/* const authenticate = jwt({
	secret: secret
}); */

const authenticate =  jwt.sign({

}, secret)

module.exports = authenticate;
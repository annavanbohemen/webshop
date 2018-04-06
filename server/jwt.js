const jwt = require ('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'

function sign(userId) {
	var token = jwt.sign({
    id: userId
  }, secret, { expiresIn: '3h' });
  return token;
}


function verify(token, callback) {
  jwt.verify(token, secret, callback)
}

module.exports = { sign, verify }
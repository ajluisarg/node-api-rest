const jwt = require('jsonwebtoken');
const { secret } = require('../config');

exports.decodeJWT = (token) => {
  // verify a token symmetric - synchronous
  const decoded = jwt.verify(token, secret);
  console.log(decoded); // bar
  return decoded;
};

const checkRole = (role, user) => {
  const permit = role === user.role;
  console.log(`This user have role ${role}? ${permit}`);

  return permit;
};

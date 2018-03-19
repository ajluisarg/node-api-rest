const jwt = require('jsonwebtoken');
const { secret } = require('../config');

exports.generateJWT = (user) => {
  console.log(user);

  const userData = {
    id: user._id,
    userName: user.userName,
    role: user.role,
    email: user.email,
  };
  return jwt.sign(
    {
      userData,
      exp: (Math.floor(Date.now() / 1000) + 60) * 60, // Expiration time: 1 hour
    },
    secret,
  );
};

exports.decodeJWT = (token) => {
  // verify a token symmetric - synchronous
  const decoded = jwt.verify(token, secret);
  console.log(decoded); // bar
  return decoded;
};

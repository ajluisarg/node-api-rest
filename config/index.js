module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'laNaveSecret',
  database: process.env.MONGODB_URI || 'mongodb://localhost/laNave',
  // Setting port for server
  port: process.env.PORT || 3880,
};

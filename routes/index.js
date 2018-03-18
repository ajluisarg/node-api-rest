const userRoutes = require('./user');
const eventRoutes = require('./event');

module.exports = (app) => {
  userRoutes(app);
  eventRoutes(app);
};

const eventController = require('../controllers/event');

module.exports = (app) => {
  // our Routes
  app.route('/events')
    .post((req, res) => eventController.createEvent(req, res));

  app.route('/events/:eventId')
    .get((req, res) => eventController.getEvent(req, res))
    .put((req, res) => eventController.updateEvent(req, res))
    .delete((req, res) => eventController.deleteEvent(req, res));
};

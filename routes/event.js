const eventController = require('../controllers/event');
const { authentication, checkRole } = require('../middlewares/auth');

module.exports = (app) => {
  // our Routes
  app
    .route('/events')
    .post(authentication, checkRole('MODERATOR'), (req, res) =>
      eventController.createEvent(req, res));

  app
    .route('/events/:eventId')
    .get((req, res) => eventController.getEvent(req, res))
    .put(authentication, checkRole('MODERATOR'), (req, res) =>
      eventController.updateEvent(req, res))
    .delete(authentication, checkRole('MODERATOR'), (req, res) =>
      eventController.deleteEvent(req, res));
};

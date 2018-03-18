const userController = require('../controllers/user');

module.exports = (app) => {
  // our Routes
  app.route('/users')
    .post((req, res) => userController.createUser(req, res))
    .delete((req, res) => userController.deleteUser(req, res));


  app.route('/users/:userId')
    .get((req, res) => userController.getUser(req, res))
    .put((req, res) => userController.updateUser(req, res));

  app.route('/users/token')
    .post((req, res) => userController.getToken(req, res));
};

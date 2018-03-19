const userController = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

module.exports = app => {
  // our Routes
  app.route("/users").post((req, res) => userController.createUser(req, res));
  app
    .route("/users/:userId")
    .get((req, res) => userController.getUser(req, res));
  app
    .route("/users/me")
    .put(authentication, (req, res) => userController.updateUser(req, res))
    .delete(authentication, (req, res) => userController.deleteUser(req, res));
  app
    .route("/users/token")
    .post((req, res) => userController.getToken(req, res));
};

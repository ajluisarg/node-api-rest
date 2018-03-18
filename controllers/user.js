const UserSchema = require('../models/user');
const { secret } = require('../config');

const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  console.log('Creating user...');

  UserSchema.create(req.body, (err, user) => {
    if (err) return res.json(`Error creating user: ${err}`).status(400);
    return res.send(user).status(202);
  });
};

const getUser = (req, res) => {
  console.log(`Finding user with id: ${req.params.userId}`);

  UserSchema.findById(req.params.userId, { password: 0 }, (err, result) => {
    if (err) {
      return res.send(err).status(500);
    }
    return res.status(200).send({ result });
  });
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

const getToken = (req, res) => {
  const {
    email, userName, password,
  } = req.body;

  UserSchema.findOne(
    { $or: [{ email }, { userName }], $and: [{ password }] },
    (err, existingUser) => {
      if (err) {
        return res.send(err).status(500);
      }
      return res.json(jwt.sign({ foo: existingUser }, secret)).status(200);
    },
  );
};

module.exports = {
  createUser, getUser, updateUser, deleteUser, getToken,
};

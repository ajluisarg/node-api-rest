const UserSchema = require("../models/user");
const { secret } = require("../config");
const { generateJWT } = require("../helpers");

const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  console.log("Creating user...");

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
  const update = req.body;
  UserSchema.findByIdAndUpdate(
    req.user.userData.id,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.send(err).status(500);
      }
      return res.status(200).send(user);
    }
  );
};

const deleteUser = (req, res) => {
  UserSchema.remove({ _id: req.user.userData.id }, err => {
    if (err) {
      return res.send(err).status(500);
    }
    return res.status(204).send();
  });
};

const getToken = (req, res) => {
  const { email, password } = req.body;

  UserSchema.findOne({ email }, (err, existingUser) => {
    if (err || !existingUser) {
      return res.json("User not found").status(400);
    }
    existingUser.comparePassword(password, (err, exist) => {
      if (err) {
        return res.json("User not found").status(400);
      }
      if (exist) {
        console.log(existingUser);

        return res
          .send({ token: "Bearer " + generateJWT(existingUser) })
          .status(200);
      } else {
        res.json("User not found").status(400);
      }
    });
  });
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getToken
};

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: { type: String, required: true, unique: true },
  image: String,
  role: {
    type: String,
    enum: ["MEMBER", "MODERATOR"],
    default: "MEMBER"
  }
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre("save", function(next) {
  const user = this,
    SALT_FACTOR = 5;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre("findOneAndUpdate", function(next) {
  console.log(this.getUpdate());

  const update = this.getUpdate()["$set"];

  if (!update.password) {
    return next();
  }
  const SALT_FACTOR = 5;

  console.log("Password modified");

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(update.password, salt, null, (err, hash) => {
      if (err) return next(err);
      update.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  });
};

module.exports = mongoose.model("Users", UserSchema);

const jwt = require("jsonwebtoken");
const { secret } = require("../config");

exports.authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Authentication required" });
  }

  const token = req.headers.authorization.substring(
    req.headers.authorization.indexOf(" ") + 1
  );

  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(403).send(err);

    req.user = decoded;
    console.log(req.user);

    next();
  });
};

exports.checkRole = (...roles) => {
  return (req, res, next) => {
    console.log("user role: " + req.user.userData.role);

    const allow = roles.includes(req.user.userData.role);
    roles.forEach(role => {
      console.log(`This user have role ${role}? ${allow}`);
    });
    if (!allow) return res.status(403).json({ message: "Not allowed" });
    next();
  };
};

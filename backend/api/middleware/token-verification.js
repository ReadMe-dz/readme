const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (jwt.decode(token).exp > Date.now() / 1000) {
        req.verifiedToken = jwt.verify(
          token,
          process.env.JWT_KEY || "G0-p2^vPj1/6$vE[aK1vM3$5"
        );
        next();
      } else {
        res.status(401).json({
          message: "Authentication Failed.",
          error: "Token Expaired.",
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "Authentication Failed.", error: "Unvalid Token." });
    }
  } catch (error) {
    res.status(401).json({ message: "Auth Failed." });
  }
};

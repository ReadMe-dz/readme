const jwt = require('jsonwebtoken');
const { ERROR } = require('../utils/msgTypes');

module.exports = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (jwt.decode(token).exp > Date.now() / 1000) {
        req.verifiedToken = jwt.verify(
          token,
          process.env.JWT_KEY || 'G0-p2^vPj1/6$vE[aK1vM3$5'
        );
        next();
      } else {
        res.status(401).json({
          message: {
            type: ERROR,
            content: 'Your token is unvalid, Please logout and relogin.',
          },
        });
      }
    } else {
      res.status(401).json({
        message: {
          type: ERROR,
          content: 'Your token is unvalid, Please logout and relogin.',
        },
      });
    }
  } catch (error) {
    res.status(401).json({
      message: {
        type: ERROR,
        content: 'This is not supposed to happen, Please report this to us.',
      },
      error,
    });
  }
};

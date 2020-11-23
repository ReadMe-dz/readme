const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const User = require('../../models/user.model');
require('dotenv').config();

const { JWT_VERFICATION_KEY, HOSTNAME } = process.env;

const getResetPasswordLink = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .exec()
    .then(async (result) => {
      if (result) {
        const verificationlink = `${
          HOSTNAME || req.hostname
        }/users/reset/${jwt.sign(
          { email },
          JWT_VERFICATION_KEY || 'G0-p2^vPj16$vE9*Sd2+5fdG6Jsf*',
          { expiresIn: 60 * 60 * 2 }
        )}${Math.random().toString().slice(2, 7)}`;

        const emailContent = `
          <div style="max-width: 600px; text-align: center; color: #000000; margin: 0 auto;">
            <img style="display: inline-block; width: 128px; height: 128px;" src="https://i.ibb.co/NsPb7kB/Untitled-1.png" />
            <p>Hello ${result.username},</p>
            <br />
            <p>Someone (hopefully you) has requested a password reset for your <b style="color: #ea4c89;">Read Me</b> account. Follow the link below to set a new password:</p>
            <a style="color: #ea4c89; text-decoration: underline;" href="${verificationlink}">${verificationlink}</a>
            <p>If you don't wish to reset your password, disregard this email and no action will be taken and the link will expired in 2 hours.</p>
            <br />
            <p>Best Regards</p>
            <p>The <b style="color: #ea4c89;">Read Me</b> team</p>
          </div>
        `;
        await mailer(email, 'Read Me - Reset Password', emailContent);

        res.status(200).json({
          message: {
            type: 'success',
            content:
              'We have sent you instructions to reset your password to your email address.',
          },
        });
      } else {
        res.status(404).json({
          message: {
            type: 'error',
            content:
              'We could not find any account associated to this email address.',
          },
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: {
          type: 'error',
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = getResetPasswordLink;

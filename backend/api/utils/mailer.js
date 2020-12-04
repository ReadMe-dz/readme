const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASS } = process.env;
const mailer = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    await transporter.sendMail({
      from: 'Read Me 📚',
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log('[!] Error in mailer', error);
  }
};

module.exports = mailer;

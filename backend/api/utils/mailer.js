const nodemailer = require('nodemailer');
require('dotenv').config();

const { NODEMAILER_USER_EMAIL, NODEMAILER_USER_PASSWORD } = process.env;
const mailer = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_USER_EMAIL,
        pass: NODEMAILER_USER_PASSWORD,
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

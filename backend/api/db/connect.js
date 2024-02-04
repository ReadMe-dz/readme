const mongoose = require('mongoose');

module.exports = () => {
  const MONGODB_URL = process.env.MONGODB_URL;

  mongoose.connect(
    MONGODB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: true,
    },
    () => console.log('[+] connected to the database ...')
  );
};

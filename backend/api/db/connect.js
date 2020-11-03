const mongoose = require("mongoose");

module.exports = () => {
  const DB_URL = process.env.DB_URL || "localhost";
  const DB_PORT = process.env.DB_PORT || 27017;
  const DB_NAME = process.env.DB_NAME || "books";

  mongoose.connect(
    `mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    () => console.log("[+] connected to the database ...")
  );
};

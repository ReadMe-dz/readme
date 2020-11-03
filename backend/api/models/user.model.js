const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, require: true },
  username: { type: String, required: true },
  wilaya: { type: String, required: true },
  moreInfo: { type: String },
  picture: { type: String },
  birthdate: { type: Date },
  phone: { type: String },
  facebook: { type: String },
  twitter: { type: String },
});

module.exports = mongoose.model("User", userSchema);

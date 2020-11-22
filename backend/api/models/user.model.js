const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    username: { type: String, required: true },
    wilaya: { type: String, required: true },
    moreInfo: { type: String, trim: true },
    picture: { type: String },
    birthdate: { type: Date },
    phone: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('User', userSchema);

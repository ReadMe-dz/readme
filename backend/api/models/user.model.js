const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, require: true },
    username: { type: String, required: true, trim: true },
    wilaya: { type: String, required: true, trim: true },
    moreInfo: { type: String, trim: true },
    picture: { type: String },
    birthdate: { type: Date },
    phone: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    verified: { type: Boolean },
    complete: { type: Boolean },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('User', userSchema);

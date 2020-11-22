const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String },
    cover: { type: String },
    details: { type: String },
    state: { type: String },
    genre: { type: String },
    language: { type: String },
    price: { type: Number },
    year: { type: Number },
  },
  { timestamps: true }
);

bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
    language: { type: String, trim: true },
    comments: [
      {
        id: { type: String, required: true, trim: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: { type: String, required: true, trim: true },
        commentedAt: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

requestSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Request', requestSchema);

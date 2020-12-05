const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

commentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Comment', commentSchema);

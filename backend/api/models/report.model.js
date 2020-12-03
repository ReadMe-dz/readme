const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    details: { type: String, trim: true },
    done: { type: Boolean, required: true },
  },
  { timestamps: true }
);

reportSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model('Report', reportSchema);

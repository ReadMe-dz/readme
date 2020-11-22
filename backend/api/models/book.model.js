const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publisher: { type: String, trim: true },
    cover: { type: String },
    details: { type: String, trim: true },
    state: { type: String, trim: true },
    genre: { type: String, trim: true },
    language: { type: String, trim: true },
    price: { type: Number, trim: true },
    year: { type: Number, trim: true },
  },
  { timestamps: true }
);

bookSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = mongoose.model("Book", bookSchema);

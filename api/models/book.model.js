const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    images: { type: Array },
    price: { type: Number }
})

module.exports = mongoose.model("Book", bookSchema)
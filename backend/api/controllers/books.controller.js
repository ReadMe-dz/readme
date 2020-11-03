const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");
const Book = require("../models/book.model");

const searchBooks = (req, res) => {
  const { title, author, price } = req.query;
  const find = { title, author, price };

  Book.find(find)
    .select("_id user title author images price")
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, books: result })
    )
    .catch((error) => res.status(500).json(error));
};

const getAllBooks = (req, res) => {
  Book.find()
    .select("_id user title author images price")
    .populate("user")
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, books: result })
    )
    .catch((error) => res.status(500).json(error));
};

const getBookById = (req, res) => {
  Book.findById(req.params.id)
    .select("_id user title author images price")
    .populate("user")
    .exec()
    .then((result) =>
      result
        ? res.status(200).json(result)
        : res.status(404).json({ error: { message: "Not Found" } })
    )
    .catch((error) => res.status(500).json(error));
};

const addBook = (req, res) => {
  const { title, author, user, price } = req.body;
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
    user,
    price,
  });
  if (req.file.path) book.cover = req.file.path;

  book
    .save()
    .then((result) => res.status(201).json({ created: result, success: true }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req, res) => {
  const { title, author, price } = req.body;
  const newBook = { title, author, price };

  if (req.file.path) {
    User.findOne({ _id: req.params.id })
      .exec()
      .then((result) => {
        if (result.cover)
          fs.unlinkSync(path.join(__dirname, `../../${result.cover}`));
        newBook.cover = req.file.path;
        Book.updateOne({ _id: req.params.id }, { $set: newBook })
          .exec()
          .then(() =>
            res.status(200).json({ updated_id: req.params.id, success: true })
          )
          .catch((error) => res.status(500).json(error));
      })
      .catch((error) => res.status(500).json(error));
  } else {
    Book.updateOne({ _id: req.params.id }, { $set: newBook })
      .exec()
      .then(() =>
        res.status(200).json({ updated_id: req.params.id, success: true })
      )
      .catch((error) => res.status(500).json(error));
  }
};

const deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .exec()
    .then(() =>
      res.status(200).json({ deleteId: req.params.id, success: true })
    )
    .catch((error) => res.status(500).json(error));
};

module.exports = {
  searchBooks,
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};

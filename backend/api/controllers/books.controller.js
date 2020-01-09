const mongoose = require("mongoose")
const Book = require("../models/book.model")
const fs = require("fs")
const path = require("path")

const search_books = (req, res, next) => {
    let find = {}
    req.query.title ? find.title = req.query.title : null
    req.query.author ? find.author = req.query.author : null
    req.query.price ? find.price = req.query.price : null

    Book.find(find)
        .select("_id user title author images price").exec()
        .then(result => res.status(200).json({ count: result.length, books: result }))
        .catch(error => res.status(500).json(error))
}

const get_all_books = (req, res, next) => {
    Book.find()
        .select("_id user title author images price").populate("user").exec()
        .then(result => res.status(200).json({ count: result.length, books: result }))
        .catch(error => res.status(500).json(error))
}

const get_book_by_id = (req, res, next) => {
    Book.findById(req.params.id)
        .select("_id user title author images price").populate("user").exec()
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ error: { message: "Not Found" } }))
        .catch(error => res.status(500).json(error))
}

const add_book = (req, res, next) => {
    let { title, author, user, price } = req.body
    let book = new Book({ _id: new mongoose.Types.ObjectId(), title, author, user, price })
    if (req.file.path) book.conver = req.file.path

    book.save()
        .then(result => res.status(201).json({ created: result, success: true }))
        .catch(error => res.status(500).json({ error }))
}

const update_book = (req, res, next) => {
    let new_book = {}
    req.body.title ? new_book.title = req.body.title : null
    req.body.author ? new_book.author = req.body.author : null
    req.body.price ? new_book.price = req.body.price : null

    if (req.file.path) {
        User.findOne({ _id: req.params.id }).exec()
            .then(result => {
                if (result.conver)
                    fs.unlinkSync(path.join(__dirname, "../../" + result.conver))
                new_book.conver = req.file.path
                Book.updateOne({ _id: req.params.id }, { $set: new_book }).exec()
                    .then(result => res.status(200).json({ updated_id: req.params.id, success: true }))
                    .catch(error => res.status(500).json(error))
            })
            .catch(error => res.status(500).json(error))
    } else {
        Book.updateOne({ _id: req.params.id }, { $set: new_book }).exec()
            .then(result => res.status(200).json({ updated_id: req.params.id, success: true }))
            .catch(error => res.status(500).json(error))
    }
}

const delete_book = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id }).exec()
        .then(result => res.status(200).json({ deleted_id: req.params.id, success: true }))
        .catch(error => res.status(500).json(error))
}

module.exports = { search_books, get_all_books, get_book_by_id, add_book, update_book, delete_book }

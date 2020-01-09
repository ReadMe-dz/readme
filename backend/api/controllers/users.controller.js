const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const fs = require("fs")
const path = require("path")

const search_users = (req, res, next) => {
    let find = {}
    req.query.username ? find.username = req.query.username : null
    req.query.wilaya ? find.wilaya = req.query.wilaya : null

    User.find(find)
        .select("_id email username wilaya more_info picture birthdate phone facebook twitter").exec()
        .then(result => res.status(200).json({ count: result.length, users: result }))
        .catch(error => res.status(500).json(error))
}

const get_all_users = (req, res, next) => {
    User.find()
        .select("_id email username wilaya more_info picture birthdate phone facebook twitter").exec()
        .then(result => res.status(200).json({ count: result.length, users: result }))
        .catch(error => res.status(500).json(error))
}

const get_user_by_id = (req, res, next) => {
    User.findById(req.params.id)
        .select("_id email username wilaya more_info picture birthdate phone facebook twitter").exec()
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ error: { message: "Not Found" } }))
        .catch(error => res.status(500).json(error))
}

const add_user = (req, res, next) => {
    let { email, password, username, wilaya } = req.body
    User.find({ email }).exec()
        .then(result => {
            if (result.length > 0) {
                res.status(409).json({ message: "Email allready exists." })
            } else {
                bcryptjs.hash(String(password), 7, (error, hashed) => {
                    if (error) {
                        res.status(500).json({ error })
                    } else {
                        let user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email,
                            password: hashed,
                            username,
                            wilaya
                        })

                        // add some validation HERE !!!
                        user.save()
                            .then(result => res.status(201).json({ created: result, success: true }))
                            .catch(error => res.status(500).json({ error }))
                    }
                })
            }
        })
        .catch(error => res.status(500).json(error))
}

const update_user = (req, res, next) => {
    let new_user = {}
    req.body.email ? new_user.email = req.body.email : null
    req.body.password ? new_user.password = req.body.password : null
    req.body.username ? new_user.username = req.body.username : null
    req.body.wilaya ? new_user.wilaya = req.body.wilaya : null
    req.body.more_info ? new_user.more_info = req.body.more_info : null
    req.body.birthdate ? new_user.birthdate = req.body.birthdate : null
    req.body.phone ? new_user.phone = req.body.phone : null
    req.body.facebook ? new_user.facebook = req.body.facebook : null
    req.body.twitter ? new_user.twitter = req.body.twitter : null

    if (req.file.path) {
        User.findOne({ _id: req.params.id }).exec()
            .then(result => {
                if (result.picture)
                    fs.unlinkSync(path.join(__dirname, "../../" + result.picture))
                new_user.picture = req.file.path
                User.updateOne({ _id: req.params.id }, { $set: new_user }).exec()
                    .then(result => res.status(200).json({ updated_id: req.params.id, success: true }))
                    .catch(error => res.status(500).json(error))
            })
            .catch(error => res.status(500).json(error))
    } else {
        User.updateOne({ _id: req.params.id }, { $set: new_user }).exec()
            .then(result => res.status(200).json({ updated_id: req.params.id, success: true }))
            .catch(error => res.status(500).json(error))
    }
}

const delete_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).exec()
        .then(result => res.status(200).json({ deleted_id: req.params.id, success: true }))
        .catch(error => res.status(500).json(error))
}

const login_user = (req, res, next) => {
    let { email, password } = req.body
    User.findOne({ email }).exec()
        .then(user => {
            if (user) {
                bcryptjs.compare(String(password), user.password, (error, result) => {
                    if (error || !result) res.status(401).json({ message: "Auth Failed." })
                    else {
                        let token = jwt.sign({ email, _id: user._id }, process.env.JWT_KEY || "What The Fuck", { expiresIn: "5d" })
                        res.status(200).json({ message: "Logged In.", token })
                    }
                })

            } else {
                res.status(401).json({ message: "Auth Failed." })
            }
        })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
}


module.exports = { search_users, get_all_users, get_user_by_id, add_user, update_user, delete_user, login_user }

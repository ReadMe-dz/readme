const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");

const searchUsers = (req, res) => {
  const { username, wilaya } = req.query;
  const find = { username, wilaya };

  User.find(find)
    .select(
      "_id email username wilaya moreInfo picture birthdate phone facebook twitter"
    )
    .exec()
    .then((result) =>
      res.status(200).json({ count: result.length, users: result })
    )
    .catch((error) => res.status(500).json(error));
};
/*
const getAllUsers = (req, res) => {
    User.find()
        .select("_id email username wilaya moreInfo picture birthdate phone facebook twitter").exec()
        .then(result => res.status(200).json({ count: result.length, users: result }))
        .catch(error => res.status(500).json(error))
}
*/
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .select(
      "_id email username wilaya moreInfo picture birthdate phone facebook twitter"
    )
    .exec()
    .then((result) =>
      result
        ? res.status(200).json(result)
        : res.status(404).json({ error: { message: "Not Found" } })
    )
    .catch((error) => res.status(500).json(error));
};

const addUser = (req, res) => {
  const { email, password, username, wilaya } = req.body;

  User.find({ email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        if (req.file) {
          fs.unlinkSync(path.join(__dirname, `../../${req.file.path}`));
        }
        res.status(409).json({ message: "Email already exists." });
      } else {
        bcryptjs.hash(String(password), 7, (error, hashed) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email,
              password: hashed,
              username,
              wilaya,
              picture: req.file
                ? req.file.path
                : "api/uploads/6321661312364123146.png",
            });

            // add some validation HERE !!!
            user
              .save()
              .then((userResult) =>
                res.status(201).json({ created: userResult, success: true })
              )
              .catch((userError) => res.status(500).json({ userError }));
          }
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};

const updateUser = (req, res) => {
  const {
    email,
    password,
    username,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  } = req.body;
  const newUser = {
    email,
    password,
    username,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  };

  if (req.file.path) {
    newUser.picture = req.file.path;
  } else {
    newUser.picture = "api/uploads/0321661312364.png";
  }

  User.findOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (result.picture)
        fs.unlinkSync(path.join(__dirname, `../../${result.picture}`));

      User.updateOne({ _id: req.params.id }, { $set: newUser })
        .exec()
        .then(() =>
          res.status(200).json({ updated_id: req.params.id, success: true })
        )
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then(() =>
      res.status(200).json({ deletedId: req.params.id, success: true })
    )
    .catch((error) => res.status(500).json(error));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        bcryptjs.compare(String(password), user.password, (error, result) => {
          if (error || !result)
            res.status(401).json({ message: "Auth Failed." });
          else {
            const token = jwt.sign(
              { email, _id: user._id },
              process.env.JWT_KEY || "G0-p2^vPj1/6$vE[aK1vM3$5",
              { expiresIn: "5d" }
            );
            res.status(200).json({
              message: "Logged In.",
              token,
              user: {
                email: user.email,
                picture: user.picture,
                username: user.username,
                wilaya: user.wilaya,
              },
            });
          }
        });
      } else {
        res.status(401).json({ message: "Auth Failed." });
      }
    })
    .catch((error) =>
      res.status(500).json({ error, message: "there was an error" })
    );
};

const loadUser = (req, res) => {
  const { email } = req.verifiedToken;
  User.findOne({ email })
    .exec()
    .then((data) => {
      if (data) {
        const { picture, username, wilaya } = data;
        res.status(200).json({ user: { picture, username, wilaya } });
      } else {
        res.status(401).json({ message: "Auth Failed." });
      }
    })
    .catch((error) =>
      res.status(500).json({ error, message: "there was an error" })
    );
};

module.exports = {
  searchUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  loadUser,
};

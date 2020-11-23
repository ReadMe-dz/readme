const fs = require('fs');
const path = require('path');
const User = require('../../models/user.model');
const validate = require('../../validations/user.validator');

const updateUser = (req, res) => {
  const {
    email,
    username,
    name,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  } = req.body;
  const newUser = {
    email,
    username,
    name,
    wilaya,
    moreInfo,
    birthdate,
    phone,
    facebook,
    twitter,
  };

  const defaultPic = 'api/uploads/users/0321661312364.png';
  if (req.file && req.file.path) {
    newUser.picture = req.file.path;
  }

  User.findOne({ _id: req.params.id })
    .exec()
    .then(async (result) => {
      try {
        const validation = await validate.validateAsync({
          email,
          username,
          name,
          wilaya,
          moreInfo,
          birthdate,
          phone,
          facebook,
          twitter,
        });

        if (!validation.error) {
          if (
            req.file &&
            req.file.path &&
            result.picture &&
            result.picture !== defaultPic
          ) {
            fs.unlinkSync(path.join(__dirname, `../../../${result.picture}`));
          }

          User.updateOne({ _id: req.params.id }, { $set: newUser })
            .exec()
            .then(() => {
              res.status(200).json({
                updated_id: req.params.id,
                success: true,
                message: {
                  type: 'success',
                  content: 'Your profile was updated successfully.',
                },
              });
            })
            .catch((error) =>
              res.status(500).json({
                error,
                message: {
                  type: 'error',
                  content:
                    'This is not supposed to happen, Please report this to us.',
                },
              })
            );
        } else {
          res.status(401).json({
            message: {
              type: 'error',
              content: 'Unvalid inputs, Please check you inputs and try again.',
            },
          });
        }
      } catch (catchError) {
        res.status(500).json({
          error: catchError,
          message: {
            type: 'error',
            content:
              'This is not supposed to happen, Please report this to us.',
          },
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: {
          type: 'error',
          content: 'This is not supposed to happen, Please report this to us.',
        },
      })
    );
};

module.exports = updateUser;

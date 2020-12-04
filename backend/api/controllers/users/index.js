const getSearchUsers = require('./getSearchUsers');
const getUserById = require('./getUserById');
const postUser = require('./postUser');
const patchUser = require('./patchUser');
const deleteUser = require('./deleteUser');
const postLoginUser = require('./postLoginUser');
const getLoadUser = require('./getLoadUser');
const getAllUsers = require('./getAllUsers');
const getVerifyEmail = require('./getVerifyEmail');
const getResetPasswordLink = require('./getResetPasswordLink');
const getResetPassword = require('./getResetPassword');
const postResetPassword = require('./postResetPassword');
const postChangePassword = require('./postChangePassword');
const postLoginWithFacebook = require('./postLoginWithFacebook');
const postRegisterWithFacebook = require('./postRegisterWithFacebook');
const postLoginWithGoogle = require('./postLoginWithGoogle');
const postRegisterWithGoogle = require('./postRegisterWithGoogle');

module.exports = {
  getSearchUsers,
  getUserById,
  postUser,
  patchUser,
  deleteUser,
  postLoginUser,
  getLoadUser,
  getAllUsers,
  getVerifyEmail,
  getResetPasswordLink,
  getResetPassword,
  postResetPassword,
  postChangePassword,
  postLoginWithFacebook,
  postRegisterWithFacebook,
  postLoginWithGoogle,
  postRegisterWithGoogle,
};

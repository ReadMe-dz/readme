const searchUsers = require('./searchUsers');
const getUserById = require('./getUserById');
const addUser = require('./addUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const loginUser = require('./loginUser');
const loadUser = require('./loadUser');
const getAllUsers = require('./getAllUsers');
const verifyEmail = require('./verifyEmail');
const getResetPasswordLink = require('./getResetPasswordLink');
const getResetPassword = require('./getResetPassword');
const resetPassword = require('./resetPassword');
const changePassword = require('./changePassword');
const loginWithFacebook = require('./loginWithFacebook');
const registerWithFacebook = require('./registerWithFacebook');
const loginWithGoogle = require('./loginWithGoogle');
const registerWithGoogle = require('./registerWithGoogle');

module.exports = {
  searchUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  loadUser,
  getAllUsers,
  verifyEmail,
  getResetPasswordLink,
  getResetPassword,
  resetPassword,
  changePassword,
  loginWithFacebook,
  registerWithFacebook,
  loginWithGoogle,
  registerWithGoogle,
};

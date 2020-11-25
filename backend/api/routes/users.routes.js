const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const {
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
  changePassword,
  loginWithFacebook,
  registerWithFacebook,
} = require('../controllers/users');

const uploads = require('../middleware/images-upload');

const usersRouter = express.Router();

usersRouter.get('/all', getAllUsers);

usersRouter.get('/search', searchUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', uploads.single('picture'), addUser);

usersRouter.post('/register/facebook', registerWithFacebook);

usersRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('picture'),
  updateUser
);

usersRouter.delete('/:id', tokenVerification, deleteUser);

usersRouter.post('/login/facebook', loginWithFacebook);

usersRouter.post('/login', loginUser);

usersRouter.get('/verify/:verificationToken', verifyEmail);

usersRouter.get('/', tokenVerification, loadUser);

usersRouter.post('/reset', getResetPasswordLink);

usersRouter.get('/reset/:resetToken', getResetPassword);

usersRouter.post('/change', changePassword);

module.exports = usersRouter;

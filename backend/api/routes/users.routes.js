const express = require('express');
const tokenVerification = require('../middleware/token-verification');
const {
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
} = require('../controllers/users');

const uploads = require('../middleware/images-upload');

const usersRouter = express.Router();

usersRouter.get('/all', getAllUsers);

usersRouter.get('/search', getSearchUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', uploads.single('picture'), postUser);

usersRouter.post('/register/facebook', postRegisterWithFacebook);

usersRouter.post('/register/google', postRegisterWithGoogle);

usersRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('picture'),
  patchUser
);

usersRouter.delete('/:id', tokenVerification, deleteUser);

usersRouter.post('/login/facebook', postLoginWithFacebook);

usersRouter.post('/login/google', postLoginWithGoogle);

usersRouter.post('/login', postLoginUser);

usersRouter.get('/verify/:verificationToken', getVerifyEmail);

usersRouter.get('/', tokenVerification, getLoadUser);

usersRouter.post('/reset', getResetPasswordLink);

usersRouter.get('/reset/:resetToken', getResetPassword);

usersRouter.post('/reset-password', postResetPassword);

usersRouter.post('/change-password', tokenVerification, postChangePassword);

module.exports = usersRouter;

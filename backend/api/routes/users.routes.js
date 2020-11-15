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
} = require('../controllers/users.controller');
const uploads = require('../middleware/images-upload');

const usersRouter = express.Router();

usersRouter.get('/all', getAllUsers);

usersRouter.get('/search', searchUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', uploads.single('picture'), addUser);

usersRouter.patch(
  '/:id',
  tokenVerification,
  uploads.single('picture'),
  updateUser
);

usersRouter.delete('/:id', tokenVerification, deleteUser);

usersRouter.post('/login', loginUser);

usersRouter.get('/', tokenVerification, loadUser);

module.exports = usersRouter;

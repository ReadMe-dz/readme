const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.baseUrl === '/users') callback(null, 'api/uploads/users');
    if (req.baseUrl === '/books') callback(null, 'api/uploads/books');
  },
  filename: (req, file, callback) => {
    const name = new Date().getTime() + Math.random().toFixed(3) * 1000;
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
    callback(null, name + ext);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    callback(null, true);
  else callback(new Error('Error! Unacceptable file type.'), false);
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2097152 },
});

module.exports = uploads;

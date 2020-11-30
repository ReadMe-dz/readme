const Book = require('../../models/book.model');
const { ERROR } = require('../../utils/msgTypes');

const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate(
        'user',
        '_id email name username wilaya moreInfo picture birthdate phone facebook twitter'
      )
      .exec();
    const userBooks = await Book.find({ user: book.user.id })
      .populate('user', '_id name picture wilaya')
      .limit(5)
      .exec();
    const relatedBooks = await Book.find({
      _id: { $ne: book._id },
      $or: [
        { author: new RegExp(book.author, 'i') },
        { title: new RegExp(book.title, 'i') },
        { genre: book.genre, language: book.language },
      ],
    })
      .populate('user', '_id name picture wilaya')
      .limit(10)
      .exec();

    res.status(200).json({ book, userBooks, relatedBooks });
  } catch (error) {
    res.status(500).json({
      error,
      message: {
        type: ERROR,
        content: 'This is not supposed to happen, Please report this to us.',
      },
    });
  }
};

module.exports = getBookDetails;

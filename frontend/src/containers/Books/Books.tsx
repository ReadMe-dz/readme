import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../../components/Book';
import './style.scss';

const { REACT_APP_BASE_URL } = process.env;

type bookOwner = {
  id: string;
  picture: string;
  name: string;
  wilaya: string;
};

type book = {
  id: string;
  title: string;
  author: string;
  publisher?: string | null;
  language?: string | null;
  year?: number | null;
  price: number;
  state?: string | null;
  details?: string | null;
  cover: string;
  hearts: string[];
  user: bookOwner;
};

type props = {
  books: book[];
  noBookMsg?: string;
  isOwner: boolean;
  deleteBook?: (id: string) => void;
  user: any;
};

const Books: React.FC<props> = ({
  books,
  noBookMsg,
  isOwner,
  deleteBook,
  user,
}) => {
  const [listBooks, setListBooks] = useState(books);

  useEffect(() => {
    setListBooks(books);
  }, [books]);

  const heartBook = async (bookId: string) => {
    try {
      const res = await Axios.post(`${REACT_APP_BASE_URL}/books/heart`, {
        bookId,
      });

      if (res.data.success) {
        const updatedList = listBooks.map((b) => {
          if (b.id === bookId) {
            const index = b.hearts.indexOf(user.id);
            if (index > -1) {
              b.hearts.splice(index, 1);
            } else {
              b.hearts.push(user.id);
            }
          }
          return b;
        });
        setListBooks(updatedList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="books">
      {books.length > 0 ? (
        listBooks.map((b: book) => {
          if (b.hearts.indexOf(user.id) > -1) {
            return (
              <Book
                key={b.id}
                book={b}
                isOwner={isOwner}
                deleteBook={deleteBook}
                isHearted
                heartBook={heartBook}
              />
            );
          }
          return (
            <Book
              key={b.id}
              book={b}
              isOwner={isOwner}
              deleteBook={deleteBook}
              isHearted={false}
              heartBook={heartBook}
            />
          );
        })
      ) : (
        <div className="no-book">
          <h2>{noBookMsg || 'No Book Was Found.'}</h2>
        </div>
      )}
    </div>
  );
};

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publisher: PropTypes.string,
      language: PropTypes.string,
      year: PropTypes.number,
      state: PropTypes.string,
      price: PropTypes.number.isRequired,
      details: PropTypes.string,
      cover: PropTypes.string.isRequired,
      hearts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        wilaya: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  noBookMsg: PropTypes.string,
  isOwner: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func,
  user: PropTypes.any.isRequired,
};

Books.defaultProps = {
  noBookMsg: 'No Book Was Found.',
  deleteBook: () => null,
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Books);

import React from 'react';
import PropTypes from 'prop-types';
import Book from '../../components/Book';
import './style.scss';

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
  user: bookOwner;
};

type props = {
  books: book[];
  noBookMsg?: string;
  isOwner: boolean;
  deleteBook?: (id: string) => void;
};

const Books: React.FC<props> = ({ books, noBookMsg, isOwner, deleteBook }) => {
  return (
    <div className="books">
      {books.length > 0 ? (
        books.map((b: book) => (
          <Book key={b.id} book={b} isOwner={isOwner} deleteBook={deleteBook} />
        ))
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
};

Books.defaultProps = {
  noBookMsg: 'No Book Was Found.',
  deleteBook: () => null,
};

export default Books;

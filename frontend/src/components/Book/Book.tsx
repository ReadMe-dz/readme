import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../Image';

import './style.scss';
import Button from '../Button';
import getIcon from '../../utils/icons';

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
  year?: string | null;
  price: number;
  state?: string | null;
  details?: string | null;
  cover: string;
  user: bookOwner;
};

type props = {
  book: book;
  isOwner: boolean;
  deleteBook?: (id: string) => void;
};

const { REACT_APP_BASE_URL } = process.env;
const Book: React.FC<props> = ({
  book: { id, title, cover, author, price, user },
  isOwner,
  deleteBook,
}) => {
  return (
    <div className="book">
      <div
        role="button"
        onClick={() => console.log(id)}
        onKeyDown={() => null}
        tabIndex={0}
        className="main"
      >
        <div className="book-cover">
          <Image
            alt={`${title}'s cover`}
            src={`${REACT_APP_BASE_URL}/${cover}`}
          />
        </div>
        <div className="book-infos">
          <div className="book-head">
            <b className="price">{price} DZD</b>
          </div>
          <div className="book-foot">
            <div className="infos">
              <b className="title">{title}</b>
              <b className="author">{author}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="foot">
        {isOwner && deleteBook ? (
          <>
            <Link to={`/book/${id}`}>
              <Button className="edit-button" content={getIcon('edit')} />
            </Link>
            <Button
              className="delete-button"
              onClick={() => deleteBook(id)}
              content={getIcon('trash')}
            />
          </>
        ) : (
          <>
            <Link className="user" to={`/user/${user.id}`}>
              <div className="avatar">
                <Image
                  src={`${REACT_APP_BASE_URL}/${user.picture}`}
                  alt={user.name}
                />
              </div>
              <div className="user-infos">
                <b className="name">{user.name}</b>
                <b className="wilaya">{user.wilaya}</b>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string,
    language: PropTypes.string,
    year: PropTypes.string,
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
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
  deleteBook: PropTypes.func,
};

Book.defaultProps = {
  deleteBook: () => null,
};

export default Book;

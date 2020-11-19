import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Books from '../Books';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Image from '../../components/Image';
import getIcon from '../../utils/icons';
import './style.scss';

type prop = {
  id: string;
  closeDetails: () => void;
};

const { REACT_APP_BASE_URL } = process.env;

const BookDetails: React.FC<prop> = ({ id, closeDetails }) => {
  const [bookDetails, setBookDetails] = useState<any>({
    book: {},
    user: {},
    relatedBooks: {},
    userBooks: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${REACT_APP_BASE_URL}/books/details/${id}`)
      .then((res) => {
        const { book, relatedBooks, userBooks } = res.data;
        setBookDetails({ book, user: book.user, relatedBooks, userBooks });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const { book, user, relatedBooks, userBooks } = bookDetails;

  return (
    <div className="book-details">
      <div className="head">
        <Button
          className="close"
          onClick={closeDetails}
          content={getIcon('close')}
        />
      </div>
      <div className="details">
        {loading ? (
          <div className="loader-wrapper">
            <Loader width={4} color="#ea4c89" />
          </div>
        ) : (
          <>
            <div className="the-book">
              <div className="book-cover">
                <Image
                  src={`${REACT_APP_BASE_URL}/${book.cover}`}
                  alt={book.title}
                />
              </div>
              <div className="book-infos">
                <div className="title">
                  <b>Title: </b>
                  <span>{book.title}</span>
                </div>

                <div className="author">
                  <b>Author: </b>
                  <span>{book.author}</span>
                </div>

                <div className="publisher">
                  <b>publisher: </b>
                  <span>{book.publisher || 'Not Maintained'}</span>
                </div>

                <div className="genre">
                  <b>genre: </b>
                  <span>{book.genre || 'Not Maintained'}</span>
                </div>

                <div className="langauge">
                  <b>langauge: </b>
                  <span>{book.langauge || 'Not Maintained'}</span>
                </div>

                <div className="state">
                  <b>state: </b>
                  <span>{book.state || 'Not Maintained'}</span>
                </div>

                <div className="year">
                  <b>year: </b>
                  <span>{book.year || 'Not Maintained'}</span>
                </div>

                <div className="price">
                  <b>price: </b>
                  <span>{`${book.price} DZD` || 'Not Maintained'}</span>
                </div>

                <div className="more">
                  <b>More informations: </b>
                  <span>{book.details || 'No details was maintained'}</span>
                </div>
              </div>
            </div>
            <div className="owner">
              <div className="user-avatar">
                <Image
                  src={`${REACT_APP_BASE_URL}/${user.picture}`}
                  alt={user.name}
                />
              </div>
              <div className="user-links">
                <div className="name">
                  <h2>{user.name}</h2>
                  <p>@{user.username}</p>
                </div>

                <div className="links">
                  <div className="wilaya">
                    <span className="icon">{getIcon('pin')}</span>
                    <b>{user.wilaya}</b>
                  </div>

                  <div className="email">
                    <span className="icon">{getIcon('email')}</span>
                    <b>{user.email}</b>
                  </div>

                  {user.facebook && (
                    <a className="facebook" href={user.facebook}>
                      <span className="icon">{getIcon('facebook')}</span>
                      <b>{user.facebook}</b>
                    </a>
                  )}

                  {user.twitter && (
                    <a className="twitter" href={user.twitter}>
                      <span className="icon">{getIcon('twitter')}</span>
                      <b>{user.twitter}</b>
                    </a>
                  )}

                  {user.phone && (
                    <div className="phone">
                      <span className="icon">{getIcon('phone')}</span>
                      <b>{user.phone}</b>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="user-books">
              <div className="user-books__title">
                <h1>
                  More Books From <span>{user.username}</span>:
                </h1>
              </div>
              <Books books={userBooks} isOwner={false} />
            </div>

            <div className="related-books">
              <div className="related-books__title">
                <h1>Related Books:</h1>
              </div>
              <Books books={relatedBooks} isOwner={false} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

BookDetails.propTypes = {
  id: PropTypes.string.isRequired,
  closeDetails: PropTypes.func.isRequired,
};

export default BookDetails;

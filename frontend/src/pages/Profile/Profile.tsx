import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import Books from '../../containers/Books';
import ProfileCard from '../../components/ProfileCard';
import Loader from '../../components/Loader';
import NotFound from '../NotFound';

import './style.scss';

const { REACT_APP_BASE_URL } = process.env;

const Profile: React.FC<any> = ({
  match: {
    params: { id },
  },
  logged,
  setMsg,
}: any) => {
  const [user, setUser] = useState(logged);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (logged.id !== id) {
      setLoading(true);
      Axios.get(`${REACT_APP_BASE_URL}/users/${id}`)
        .then(({ data }) => {
          setUser(data);
          setIsOwner(false);
        })
        .catch((err) => {
          console.dir(err);
          setNotFound(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setNotFound(false);
      setUser(logged);
      setIsOwner(true);
    }

    setLoadingBooks(true);
    Axios.get(`${REACT_APP_BASE_URL}/books/user/${id}`)
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        setLoadingBooks(false);
      });
  }, [id]);

  const deleteBook = (bookId: string) => {
    if (
      window.confirm(
        'Are you sure want to delete this book?\n\nThis action can not be undone.'
      )
    ) {
      Axios.delete(`${REACT_APP_BASE_URL}/books/${bookId}`)
        .then(() => {
          setMsg({
            type: 'success',
            content: 'The book was deleted successfuly.',
          });

          setBooks(books.filter((b: any) => b.id !== bookId));
        })
        .catch((err) => {
          console.dir(err);
          setMsg({
            type: 'error',
            content: 'There was an error deleting the book.',
          });
        });
    }
  };

  return notFound ? (
    <NotFound message="This user does not exist or it have been removed." />
  ) : (
    <div className="profile__page">
      <div className="profile__card">
        {loading ? <Loader /> : <ProfileCard user={user} isOwner={isOwner} />}
      </div>
      <div className="profile__books">
        {loadingBooks ? (
          <Loader />
        ) : (
          <>
            <h2 className="head-title">
              {isOwner ? 'Your Books:' : `${user.username}'s Books:`}
            </h2>
            <Books
              isOwner={isOwner}
              books={books}
              deleteBook={deleteBook}
              noBookMsg={
                isOwner
                  ? 'You do not have any book yet.'
                  : 'This user does not have any book yet.'
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  logged: state.user,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);

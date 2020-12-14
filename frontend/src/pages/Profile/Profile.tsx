import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import io from 'socket.io-client';
import { Form, Formik } from 'formik';
import { message as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import Books from '../../containers/Books';
import RequestsList from '../../containers/RequestsList';
import Pagination from '../../components/Pagination';
import ProfileCard from '../../containers/ProfileCard';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader';
import NotFound from '../NotFound';

import './style.scss';

type bookOwner = {
  id: string;
  picture: string;
  name: string;
  wilaya: string;
};

interface Ibook {
  id: string;
  title: string;
  author: string;
  publisher?: string | null;
  language?: string | null;
  year?: number | null;
  price: number;
  state?: string | null;
  details?: string | null;
  hearts: string[];
  cover: string;
  genre: string;
  createdAt: string;
  user: bookOwner;
}

interface IRequest {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    wilaya: string;
  };
  title: string;
  author: string;
  language: string;
  details: string;
  comments: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    comment: string;
    commentedAt: string;
  }[];
  createdAt: string;
}

type messageValues = {
  content: string;
};

const { REACT_APP_BASE_URL } = process.env;

const socket = io(REACT_APP_BASE_URL || '', {
  transports: ['websocket'],
  jsonp: false,
});

const Profile: React.FC = ({
  match: {
    params: { id },
  },
  logged,
  setMsg,
}: any) => {
  const [user, setUser] = useState(logged);
  const [books, setBooks] = useState<Ibook[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [show, setShow] = useState<'books' | 'requests'>('books');
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const initialValues: messageValues = { content: '' };

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

    setLoadingData(true);
    Axios.get(`${REACT_APP_BASE_URL}/books/user/${id}`)
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  }, [id]);

  const deleteBook = (bookId: string) => {
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
  };

  const onDelete = (book: string) => {
    setOpenModal(true);
    setBookToDelete(book);
  };

  const onConfirm = () => {
    deleteBook(bookToDelete);
    setOpenModal(false);
  };

  useEffect(() => {
    socket.connect();
  }, []);

  const onSubmit = (
    { content }: messageValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    resetForm();
    socket.emit('message', {
      from: logged.id,
      to: id,
      content,
    });

    setOpenChatModal(false);
    setMsg({
      type: 'success',
      content: 'Your message was sent successfully',
    });
  };

  const loadBooks = () => {
    Axios.get(`${REACT_APP_BASE_URL}/requests/count/${id}`)
      .then((res) => {
        setPagesCount(Math.ceil(res.data.count / 6));
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        setMsg(message);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const loadRequests = () => {
    Axios.get(`${REACT_APP_BASE_URL}/requests/user/${id}/${currentPage}`)
      .then((res) => {
        setRequests(res.data.requests);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        setMsg(message);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  useEffect(() => {
    setLoadingData(true);
    if (show === 'books') loadBooks();
    if (show === 'requests') loadRequests();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    loadRequests();
  }, [currentPage]);

  const onComment = (comment: any) => {
    setRequests((prevReq) =>
      prevReq.map((req) => {
        if (req.id === comment.requestId) {
          req.comments.push(comment);
        }
        return req;
      })
    );
  };

  if (notFound) {
    return (
      <NotFound message="This user does not exist or it have been removed." />
    );
  }

  return (
    <div className="profile-page">
      {openModal && (
        <Modal
          title="Delete The Book"
          content={
            <>
              <p>Are you sure want to delete this book?</p>
              <p>
                <b>Note: </b>This action can not be undone.
              </p>
            </>
          }
          onClose={() => setOpenModal(false)}
          onConfirm={onConfirm}
        />
      )}

      {openChatModal && (
        <Modal
          title="Send Me A Message"
          content={
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                content: validate.content,
              })}
              onSubmit={onSubmit}
            >
              <Form>
                <Textarea
                  name="content"
                  label=""
                  className="content"
                  placeholder="write your message"
                />
                <Button className="send-button" type="submit" content="send" />
              </Form>
            </Formik>
          }
          onClose={() => setOpenChatModal(false)}
        />
      )}
      <div className="profile-page-card">
        {loading ? (
          <Loader />
        ) : (
          <ProfileCard
            user={user}
            openChatModal={() => setOpenChatModal(true)}
            isOwner={isOwner}
          />
        )}
      </div>
      <div className="profile-content">
        <div className="titles">
          <Button
            onClick={() => setShow('books')}
            className={show === 'books' ? 'active' : ''}
            content={<b>Books</b>}
          />
          <Button
            onClick={() => setShow('requests')}
            className={show === 'requests' ? 'active' : ''}
            content={<b>Requests</b>}
          />
        </div>
        <div className="contents">
          {loadingData ? (
            <Loader />
          ) : (
            <>
              {show === 'books' && (
                <Books
                  isOwner={isOwner}
                  books={books}
                  deleteBook={onDelete}
                  noBookMsg={
                    isOwner
                      ? 'You do not have any book yet.'
                      : 'This user does not have any book yet.'
                  }
                />
              )}

              {show === 'requests' && (
                <>
                  <RequestsList onComment={onComment} requests={requests} />
                  <Pagination
                    currentPage={currentPage}
                    pagesCount={pagesCount}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </>
          )}
        </div>
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

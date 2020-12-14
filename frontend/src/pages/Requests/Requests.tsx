import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import RequestsForm from '../../containers/RequestsForm';
import RequestsList from '../../containers/RequestsList';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import './style.scss';

type request = {
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
};

type props = {
  setMsg: (message: any) => void;
};

const { REACT_APP_BASE_URL } = process.env;
const Requests: React.FC<props> = ({ setMsg }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<request[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${REACT_APP_BASE_URL}/requests/count`)
      .then((res) => {
        setPagesCount(Math.ceil(res.data.count / 12));
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
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${REACT_APP_BASE_URL}/requests/${currentPage}`)
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
        setLoading(false);
      });
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

  return (
    <>
      <div className="requests">
        <h2 className="page-title">Books Requests</h2>
        <div className="add-request">
          <RequestsForm />
        </div>
        <div className="requested">
          <h2 className="page-title">Requested Books</h2>
          {loading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            <RequestsList onComment={onComment} requests={requests} />
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

Requests.propTypes = {
  setMsg: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(null, mapActionsToProps)(Requests);

import React from 'react';
import PropTypes from 'prop-types';
import Request from '../../components/Request';
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
  requests: request[];
  onComment: (comment: any) => void;
};

const RequestsList: React.FC<props> = ({ requests, onComment }) => {
  return (
    <div className="requests-list">
      {requests.length > 0 ? (
        requests.map((r: request) => (
          <Request onComment={onComment} key={r.id} request={r} />
        ))
      ) : (
        <div className="no-requests">
          <h2>There is no requests for the moment.</h2>
        </div>
      )}
    </div>
  );
};

RequestsList.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        wilaya: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          comment: PropTypes.string.isRequired,
          commentedAt: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  onComment: PropTypes.func.isRequired,
};

export default RequestsList;

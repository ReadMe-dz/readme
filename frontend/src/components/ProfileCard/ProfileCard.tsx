import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../Image';
import Button from '../Button';
import getIcon from '../../utils/icons';
import './style.scss';

type props = {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    wilaya: string;
    moreInfos?: string | null;
    picture?: string | null;
    birthdate?: string | null;
    phone?: string | null;
    facebook?: string | null;
    twitter?: string | null;
  };
  isOwner: boolean;
};

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3300';

const ProfileCard: React.FC<props> = ({ user, isOwner }) => {
  const {
    id,
    username,
    email,
    name,
    wilaya,
    moreInfos,
    picture,
    birthdate,
    phone,
    facebook,
    twitter,
  } = user;
  return (
    <div className="profile-card">
      <div className="main">
        <div className="profile-picture">
          <Image
            src={`${BASE_URL}/api/uploads/users/${
              picture || '0321661312364.png'
            }`}
            alt={name}
          />
        </div>
        <div className="infos">
          <div className="name">
            <h2>{name}</h2>
            {isOwner && (
              <Link className="edit-link" to={`/edit/${id}`}>
                <Button content="Edit Profile" />
              </Link>
            )}
          </div>
          <h4 className="username">@{username}</h4>
          <div className="wilaya">
            <span className="icon">{getIcon('pin')}</span>
            <b>{wilaya}</b>
          </div>

          <div className="wilaya">
            <span className="icon">{getIcon('cupcake')}</span>
            <b>21-12-2200</b>
          </div>
          {birthdate && (
            <div className="birthdate">
              <span className="icon">{getIcon('cupcake')}</span>
              <b>{birthdate}</b>
            </div>
          )}
        </div>
      </div>
      <div className="foot">
        <div className="bio">
          <b className="title">Bio: </b>
          <span className="content">
            {moreInfos ||
              (isOwner
                ? 'Your bio is currently blank.'
                : 'Apparently, this user prefers to keep an air of mystery about them.')}
          </span>
        </div>
        {(facebook || twitter || phone) && (
          <div className="links">
            {facebook && (
              <Link className="facebook" to={facebook}>
                {getIcon('facebook')}
              </Link>
            )}
            {twitter && (
              <Link className="twitter" to={twitter}>
                {getIcon('twitter')}
              </Link>
            )}
            {email && (
              <a className="email" href={`to:${email}`}>
                {getIcon('email')}
              </a>
            )}
            {phone && (
              <a className="phone" href={`tel:${phone}`}>
                {getIcon('phone')}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    wilaya: PropTypes.string.isRequired,
    moreInfos: PropTypes.string,
    picture: PropTypes.string,
    birthdate: PropTypes.string,
    phone: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default ProfileCard;

import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import getIcon from '../../utils/icons';
import './style.scss';

type props = {
  user: {
    username: string;
    email: string;
    name: string;
    wilaya: string;
    moreInfo?: string | null;
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
    username,
    email,
    name,
    wilaya,
    moreInfo,
    picture,
    birthdate,
    phone,
    facebook,
    twitter,
  } = user;

  return (
    <div className="profile-card">
      <div className="profile-picture">
        <Image
          src={`${BASE_URL}/${picture || '0321661312364.png'}`}
          alt={name}
        />
      </div>

      <h2 className="name">{name}</h2>

      <h4 className="username">@{username}</h4>

      <div className="wilaya">
        <span className="icon">{getIcon('pin')}</span>
        <b>{wilaya}</b>
      </div>

      <div className="email">
        <span className="icon">{getIcon('email')}</span>
        <span>{email}</span>
      </div>

      <span className="separator" />

      {birthdate && (
        <div className="birthdate">
          <span className="icon">{getIcon('cupcake')}</span>
          <b>{new Date(birthdate).toISOString().substring(0, 10)}</b>
        </div>
      )}

      {facebook && (
        <a className="facebook" href={facebook}>
          <span className="icon">{getIcon('facebook')}</span>
          <span className="link">{facebook}</span>
        </a>
      )}

      {twitter && (
        <a className="twitter" href={twitter}>
          <span className="icon">{getIcon('twitter')}</span>
          <span className="link">{twitter}</span>
        </a>
      )}

      {phone && (
        <div className="phone">
          <span className="icon">{getIcon('phone')}</span>
          <span className="link">{phone}</span>
        </div>
      )}

      <div className="bio">
        <span className="content">
          {moreInfo ||
            (isOwner
              ? 'Your bio is currently blank.'
              : 'Apparently, this user prefers to keep an air of mystery about them.')}
        </span>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    wilaya: PropTypes.string.isRequired,
    moreInfo: PropTypes.string,
    picture: PropTypes.string,
    birthdate: PropTypes.string,
    phone: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default ProfileCard;

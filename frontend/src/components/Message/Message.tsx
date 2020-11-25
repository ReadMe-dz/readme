import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearMsg } from '../../redux-store/actions/msg.actions';
import Button from '../Button';
import getIcon from '../../utils/icons';
import './style.scss';

type props = {
  content: string;
  type: 'success' | 'error';
  clear: () => void;
};

const Message: React.FC<props> = ({ content, type, clear }) => {
  return (
    <div className={`message ${type}`}>
      <p>{content}</p>
      <Button content={getIcon('close')} onClick={clear} />
    </div>
  );
};

Message.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.oneOf<'success' | 'error'>(['success', 'error']).isRequired,
  clear: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  clear: clearMsg,
};

export default connect(null, mapActionsToProps)(Message);

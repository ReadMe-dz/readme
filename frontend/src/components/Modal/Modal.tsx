import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import getIcon from '../../utils/icons';

import './style.scss';

type props = {
  title: string;
  content: React.ReactNode | object;
  onConfirm?: () => void;
  onClose: () => void;
};

const Modal: React.FC<props> = ({ title, content, onConfirm, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-wrapper">
        <div className="head">
          <h2 className="title">{title}</h2>
          <Button type="button" content={getIcon('close')} onClick={onClose} />
        </div>
        <div className="content">{content}</div>
        {onConfirm && (
          <div className="foot">
            <Button
              className="confirm-button"
              type="button"
              onClick={onConfirm}
              content={<span>confirm</span>}
            />
            <Button
              className="cancel-button"
              type="button"
              onClick={onClose}
              content={<span>cancel</span>}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  onConfirm: undefined,
};

export default Modal;

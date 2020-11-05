import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  content: React.ReactNode | object;
};

const Button: React.FC<
  props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ content, ...rest }) => {
  return (
    // The `type` should not be dynamic! >> https://github.com/yannickcr/eslint-plugin-react/issues/1555
    // eslint-disable-next-line react/button-has-type
    <button {...rest} className={`button ${rest.className}`}>
      {content}
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
};

export default Button;

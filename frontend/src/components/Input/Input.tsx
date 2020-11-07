import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  name: string;
  type: string;
  label: string;
  className?: string;
  placeholder?: string;
};

const Input: React.FC<props> = ({
  name,
  type,
  label,
  className,
  placeholder,
}) => {
  return (
    <div className={`input ${className}`}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} placeholder={placeholder} />
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
};

export default Input;

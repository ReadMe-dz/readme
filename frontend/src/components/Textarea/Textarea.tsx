import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
};

const Textarea: React.FC<props> = ({ name, label, className, placeholder }) => {
  return (
    <div className={`textarea ${className}`}>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        component="textarea"
        placeholder={placeholder}
      />
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

Textarea.defaultProps = {
  className: '',
  placeholder: '',
};

export default Textarea;

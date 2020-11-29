import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import './style.scss';

type props = {
  name: string;
  label: string;
  className?: string;
};

const Checkbox: React.FC<props> = ({ name, className, label }) => {
  return (
    <div className={`checkbox ${className}`}>
      <Field type="checkbox" id={name} name={name} />
      <label htmlFor={name}>{label}</label>
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
};

export default Checkbox;

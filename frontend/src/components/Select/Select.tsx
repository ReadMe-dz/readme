import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import './style.scss';

type props = {
  name: string;
  label: string;
  className?: string;
  options: string[];
};

const Select: React.FC<props> = ({ name, className, label, options }) => {
  return (
    <div className={`select ${className}`}>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name}>
        <option value={undefined} defaultValue={undefined}>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </Field>
      <p className="error-message">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

Select.defaultProps = {
  className: '',
};

export default Select;

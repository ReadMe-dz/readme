import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropsTypes from 'prop-types';
import './style.scss';

type props = {
  setIsHuman: (isHuman: boolean) => void;
};

const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env;

const ReCaptcha: React.FC<props> = ({ setIsHuman }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const onChange = (value: any) => {
    if (value === null) {
      setIsHuman(false);
      setIsValid(false);
    } else {
      setIsHuman(true);
      setIsValid(true);
    }
  };

  return (
    <div className="reCaptcha">
      <ReCAPTCHA
        sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
        onChange={onChange}
      />
      {isValid !== null && !isValid && (
        <p className="error-message">Unvalid reCaptcha.</p>
      )}
    </div>
  );
};

ReCaptcha.propTypes = {
  setIsHuman: PropsTypes.func.isRequired,
};

export default ReCaptcha;

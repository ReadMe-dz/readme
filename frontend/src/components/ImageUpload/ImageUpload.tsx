import React, { ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import getIcon from '../../utils/icons';

import noImg from '../../assets/images/default-avatar.jpg';
import './style.scss';

type props = {
  name: string;
  label: string;
  file?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<props> = ({
  name,
  className,
  file,
  label,
  onChange,
}) => {
  const [preview, setPreview] = useState(file);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      onChange(e);
    }
  };
  return (
    <div className={`image-upload ${className}`}>
      <div className="preview">
        {preview && (
          <>
            <div className="preview-img">
              <Image alt="preview" src={preview} />
            </div>
            <span className="upload-icon">{getIcon('upload')}</span>
          </>
        )}
        <input
          id={name}
          name={name}
          type="file"
          accept="image/x-png,image/jpeg"
          onChange={onInputChange}
        />
      </div>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  file: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  className: '',
  file: noImg,
};

export default ImageUpload;

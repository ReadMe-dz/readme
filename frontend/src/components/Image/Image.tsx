import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type props = {
  alt: string;
  src: string;
  className?: string;
};

const Image: React.FC<props> = ({ className, alt, src }) => (
  <LazyLoadImage className={className} alt={alt} effect="blur" src={src} />
);

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: '',
};

export default Image;

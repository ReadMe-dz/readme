import React from 'react';
import PropTypes from 'prop-types';
import ScrollContainer from 'react-indiana-drag-scroll';
import Button from '../Button';

import './style.scss';

type props = {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<props> = ({
  pagesCount,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <ScrollContainer className="pagination">
      {pagesCount > 1 &&
        Array.from({ length: pagesCount }, (v, i) => i).map((page) => {
          return (
            <Button
              key={`page-${page}`}
              className={`page-button ${currentPage === page ? 'active' : ''}`}
              content={<b>{page}</b>}
              onClick={() => setCurrentPage(page)}
            />
          );
        })}
    </ScrollContainer>
  );
};

Pagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;

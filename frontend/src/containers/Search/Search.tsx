import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollContainer from 'react-indiana-drag-scroll';
import SearchBar from '../SearchBar';
import Button from '../../components/Button';
import genres from '../../constants/genres';
import languages from '../../constants/languages';
import states from '../../constants/states';
import getIcon from '../../utils/icons';

import './style.scss';

type props = {
  IsSearchBar?: boolean;
  onFilter: (f: object) => void;
};

const Search: React.FC<props> = ({ IsSearchBar, onFilter }) => {
  const [isFilter, setIsFilter] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [language, setLanguage] = useState('all');
  const [state, setState] = useState('all');
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    onFilter({
      minPrice,
      maxPrice,
      language,
      state,
      genre,
      isFilter,
    });
  }, [isFilter, minPrice, maxPrice, language, state, genre]);

  return (
    <div className="search">
      {IsSearchBar && (
        <>
          <h2 className="search-bar__title">Find Your Next Favorite Book</h2>
          <SearchBar placeholder="Search by the author name, or the book title." />
        </>
      )}
      <div className="filters">
        <div className="head">
          <b>Genre: </b>
          <ScrollContainer className="genres">
            <div className=" genres-wrapper">
              <button
                className={genre === 'all' ? 'active' : ''}
                type="button"
                onClick={() => setGenre('all')}
              >
                All
              </button>
              {genres.map((g) => (
                <button
                  className={genre === g ? 'active' : ''}
                  type="button"
                  onClick={() => setGenre(g)}
                  key={g}
                >
                  {g}
                </button>
              ))}
            </div>
          </ScrollContainer>
          <div className="filter-button">
            <Button
              className={isFilter ? 'active' : ''}
              onClick={() => setIsFilter(!isFilter)}
              content={<>{getIcon('filter')} Filter</>}
            />
          </div>
        </div>
        {isFilter && (
          <div className="inputs">
            <div className="filter-input">
              <label htmlFor="min">
                <span>min price</span>
                <input
                  id="min"
                  name="min"
                  type="number"
                  step="100"
                  min={0}
                  value={minPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMinPrice(e.target.value)
                  }
                />
              </label>
            </div>

            <div className="filter-input">
              <label htmlFor="max">
                <span>max price</span>
                <input
                  id="max"
                  name="max"
                  type="number"
                  min={0}
                  step="100"
                  value={maxPrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMaxPrice(e.target.value)
                  }
                />
              </label>
            </div>

            <div className="filter-input">
              <label htmlFor="language">
                <span>language</span>
                <select
                  id="language"
                  name="language"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setLanguage(e.target.value)
                  }
                >
                  <option value={undefined}>All</option>
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="filter-input">
              <label htmlFor="state">
                <span>State</span>
                <select
                  id="state"
                  name="state"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setState(e.target.value)
                  }
                >
                  <option value={undefined}>All</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  IsSearchBar: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
};

Search.defaultProps = {
  IsSearchBar: false,
};

export default Search;

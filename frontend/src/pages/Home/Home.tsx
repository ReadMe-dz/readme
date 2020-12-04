import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadingBook,
  setBooksCount,
} from '../../redux-store/actions/book.actions';
import Books from '../../containers/Books';
import Loader from '../../components/Loader';
import Geust from '../../containers/Geust';
import Search from '../../containers/Search';
import Footer from '../../containers/Footer';

import './style.scss';

type props = {
  geust?: boolean;
  book: { id?: string | null; loading: boolean; search: string; count: number };
  setLoading: (l: boolean) => void;
  setCount: (c: number) => void;
};

type bookOwner = {
  id: string;
  picture: string;
  name: string;
  wilaya: string;
};

interface Ibook {
  id: string;
  title: string;
  author: string;
  publisher?: string | null;
  language?: string | null;
  year?: number | null;
  price: number;
  state?: string | null;
  details?: string | null;
  hearts: string[];
  cover: string;
  genre: string;
  createdAt: string;
  user: bookOwner;
}

const { REACT_APP_BASE_URL } = process.env;

const Home: React.FC<props> = ({ geust, book, setLoading, setCount }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [books, setBooks] = useState<Ibook[]>([]);
  const [initBooks, setInitBooks] = useState<Ibook[]>([]);
  const [filters, setFilters] = useState<any>({
    language: 'all',
    state: 'all',
    minPrice: 0,
    maxPrice: 100000,
    genre: 'all',
    isFilter: false,
  });

  const onFilter = ({
    language,
    state,
    minPrice,
    maxPrice,
    genre,
    isFilter,
  }: any) => {
    setFilters({
      language,
      state,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000000000,
      genre,
      isFilter,
    });
  };

  const filter = () => {
    const { language, state, minPrice, maxPrice, genre, isFilter } = filters;
    if (isFilter) {
      setBooks(
        initBooks.filter(
          (b: Ibook) =>
            (b.genre.toLowerCase() === genre.toLowerCase() ||
              genre.toLowerCase() === 'all') &&
            (b.language?.toLocaleLowerCase() ===
              language?.toLocaleLowerCase() ||
              language?.toLocaleLowerCase() === 'all') &&
            (b.state?.toLowerCase() === state?.toLowerCase() ||
              state?.toLowerCase() === 'all') &&
            b.price >= minPrice &&
            b.price <= maxPrice
        )
      );
    } else {
      setBooks(
        initBooks.filter(
          (b: Ibook) =>
            b.genre.toLowerCase() === genre.toLowerCase() ||
            genre.toLowerCase() === 'all'
        )
      );
    }
  };

  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      Axios.get(`${REACT_APP_BASE_URL}/books/search?search=${book.search}`)
        .then((res) => {
          setInitBooks(res.data.books);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setIsMounted(true);
    }
  }, [book.search]);

  useEffect(() => {
    Axios.get(`${REACT_APP_BASE_URL}/books`)
      .then((res) => {
        setInitBooks(res.data.books);
        setBooks(res.data.books);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    filter();
  }, [filters, initBooks]);

  return (
    <div className="home">
      {geust ? (
        <>
          <Geust />
          <Search onFilter={onFilter} />
          {book.loading ? <Loader /> : <Books isOwner={false} books={books} />}
        </>
      ) : (
        <>
          <Search onFilter={onFilter} IsSearchBar />
          {book.loading ? <Loader /> : <Books isOwner={false} books={books} />}
        </>
      )}

      <Footer count={book.count} />
    </div>
  );
};

Home.propTypes = {
  geust: PropTypes.bool,
  book: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    id: PropTypes.string,
    search: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  setLoading: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
};

Home.defaultProps = {
  geust: false,
};

const mapStateToProps = (state: any) => ({
  book: state.book,
});

const mapActionsToProps = {
  setLoading: loadingBook,
  setCount: setBooksCount,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);

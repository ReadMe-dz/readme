import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { book as validate } from '../../validations';
import { searchBook } from '../../redux-store/actions/book.actions';
import getIcon from '../../utils/icons';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import './style.scss';

type props = {
  book: { id?: string | null; loading: boolean; search: string };
  findBook: (search: string) => void;
  placeholder?: string;
};

type searchValues = {
  search: string;
};

const SearchBar: React.FC<props> = ({ book, findBook, placeholder }) => {
  const initialValues: searchValues = { search: '' };
  const onSubmit = (
    { search }: searchValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    findBook(search);
  };

  return (
    <div className="search-bar">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          search: validate.search,
        })}
        onSubmit={(values, { setSubmitting }) =>
          onSubmit(values, { setSubmitting })
        }
      >
        <Form className="search-form">
          <Input
            name="search"
            label=""
            type="text"
            className="search-input"
            placeholder={placeholder}
          />
          <Button
            className="search-button"
            type="submit"
            disabled={book.loading}
            content={
              book.loading ? (
                <Loader dim={20} width={2} color="#ea4c89" />
              ) : (
                <span className="icon">{getIcon('search')}</span>
              )
            }
          />
        </Form>
      </Formik>
    </div>
  );
};

SearchBar.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  findBook: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: '',
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  book: state.book,
});

const mapActionsToProps = {
  findBook: searchBook,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);

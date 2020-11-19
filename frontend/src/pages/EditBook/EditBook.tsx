import React, { ChangeEvent, useState, useEffect } from 'react';
import Axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { book as validate } from '../../validations';
import Input from '../../components/Input';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Image from '../../components/Image';
import Loader from '../../components/Loader';

import genres from '../../constants/genres';
import languages from '../../constants/languages';
import states from '../../constants/states';

import noCover from '../../assets/images/no-cover.png';
import './style.scss';

type bookValues = {
  title: string;
  author: string;
  publisher: string;
  language: string;
  year: number;
  price: number;
  state: string;
  details: string;
  genre: string;
};

const { REACT_APP_BASE_URL } = process.env;

const EditBook: React.FC = ({ setMsg, msg, user: { id }, match }: any) => {
  const [cover, setCover] = useState<string | Blob>('default');
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    language: '',
    year: 0,
    price: 0,
    state: '',
    details: '',
    genre: '',
  });

  const initVal: bookValues = {
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    language: book.language,
    year: book.year,
    price: book.price,
    state: book.state,
    details: book.details,
    genre: book.genre,
  };

  useEffect(() => {
    Axios.get(`${REACT_APP_BASE_URL}/books/${match.params.id}`)
      .then(({ data }) => {
        setBook(data);
        setCover(data.cover);
      })
      .catch((err) => console.dir(err));
  }, []);

  const onSubmit = (
    values: bookValues,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    setLoading(true);

    const {
      title,
      author,
      publisher,
      language,
      year,
      price,
      state,
      genre,
      details,
    } = values;

    const formData = new FormData();

    formData.append('user', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('language', language);
    formData.append('year', year.toString());
    formData.append('price', price.toString());
    formData.append('state', state);
    formData.append('genre', genre);
    formData.append('details', details);
    formData.append('cover', cover);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    Axios.patch(
      `${REACT_APP_BASE_URL}/books/${match.params.id}`,
      formData,
      config
    )
      .then(() => {
        setMsg({
          type: 'success',
          content: 'The book was update successfully.',
        });
      })
      .catch((err) => {
        console.dir(err);
        setMsg({
          type: 'error',
          content: 'There was an error. Please try again.',
        });
      })
      .finally(() => setLoading(false));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setCover(e.target.files[0]);
  };

  return (
    <div className="edit-book">
      <h1>Edit a book</h1>
      <div className="edit-form">
        <Formik
          enableReinitialize
          initialValues={initVal}
          validationSchema={Yup.object({
            title: validate.title,
            author: validate.author,
            publisher: validate.publisher,
            language: validate.language,
            year: validate.year,
            price: validate.price,
            state: validate.state,
            details: validate.details,
          })}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-head">
              <div className="left">
                {cover !== 'default' ? (
                  <ImageUpload
                    label="Book Cover"
                    name="cover"
                    className="book-cover"
                    onChange={onChange}
                    file={`${REACT_APP_BASE_URL}/${cover}`}
                  />
                ) : (
                  <div className="default-cover">
                    <Image src={noCover} alt="default cover" />
                  </div>
                )}
              </div>
              <div className="right">
                <Input
                  name="title"
                  label="Title"
                  type="text"
                  className="input-title"
                  placeholder="loading ..."
                />

                <Input
                  name="author"
                  label="Author"
                  type="text"
                  className="input-author"
                  placeholder="loading ..."
                />

                <Input
                  name="publisher"
                  label="Publisher"
                  type="text"
                  className="input-publisher"
                  placeholder="loading ..."
                />

                <div className="row">
                  <Select
                    label="Language"
                    name="language"
                    options={languages}
                    className="select-language"
                  />
                  <Select
                    label="Genre"
                    name="genre"
                    options={genres}
                    className="select-genre"
                  />
                  <Input
                    name="year"
                    label="Year"
                    type="number"
                    className="input-year"
                    placeholder="loading ..."
                  />
                  <Select
                    label="State"
                    name="state"
                    options={states}
                    className="select-state"
                  />
                  <Input
                    name="price"
                    label="Price"
                    type="number"
                    className="input-price"
                    placeholder="loading ..."
                  />
                </div>
              </div>
            </div>

            <Textarea
              name="details"
              label="More Details"
              className="details"
              placeholder="Say somthing about the book."
            />

            <Button
              className="save-button"
              type="submit"
              disabled={msg.content}
              content={
                loading ? (
                  <Loader dim={20} width={2} color="#212121" />
                ) : (
                  <span>Edit Book</span>
                )
              }
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  msg: state.msg,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(EditBook);

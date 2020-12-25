import React, { ChangeEvent, useState } from 'react';
import Axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { book as validate } from '../../validations';
import Footer from '../../containers/Footer';
import Input from '../../components/Input';
import InnerWrapper from '../../components/InnerWrapper';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
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
  genre: string;
  details: string;
};

const { REACT_APP_BASE_URL } = process.env;

const AddBook: React.FC = ({ setMsg, msg, user: { id } }: any) => {
  const [cover, setCover] = useState<any>(noCover);
  const [loading, setLoading] = useState(false);

  const initVal: bookValues = {
    title: '',
    author: '',
    publisher: '',
    language: '',
    genre: '',
    year: 0,
    price: 0,
    state: '',
    details: '',
  };

  const onSubmit = (
    values: bookValues,
    {
      setSubmitting,
      resetForm,
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
      genre,
      price,
      state,
      details,
    } = values;

    const formData = new FormData();

    formData.append('user', id);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publisher', publisher);
    formData.append('language', language);
    formData.append('genre', genre);
    formData.append('year', year.toString());
    formData.append('price', price.toString());
    formData.append('state', state);
    formData.append('details', details);
    formData.append('cover', cover);

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    Axios.post(`${REACT_APP_BASE_URL}/books`, formData, config)
      .then(() => {
        resetForm();
        setCover(noCover);
        setMsg({
          type: 'success',
          content: 'The book was added successfully.',
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
    <>
      <div className="add-book">
        <InnerWrapper column>
          <h1>Add a book</h1>
          <div className="edit-form">
            <Formik
              initialValues={initVal}
              validationSchema={Yup.object({
                title: validate.title,
                author: validate.author,
                publisher: validate.publisher,
                language: validate.language,
                year: validate.year,
                price: validate.price,
                state: validate.state,
                genre: validate.genre,
                details: validate.details,
              })}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="form-head">
                  <div className="left">
                    <ImageUpload
                      label="Book Cover"
                      name="cover"
                      className="book-cover"
                      onChange={onChange}
                      file={cover}
                    />
                  </div>
                  <div className="right">
                    <Input
                      name="title"
                      label="Title"
                      type="text"
                      className="input-title"
                    />
                    <Input
                      name="author"
                      label="Author"
                      type="text"
                      className="input-author"
                    />
                    <Input
                      name="publisher"
                      label="Publisher"
                      type="text"
                      className="input-publisher"
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
                        placeholder="ex: 2020"
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
                        placeholder="value in DZD"
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
                      <Loader dim={20} width={2} />
                    ) : (
                      <span>Save Book</span>
                    )
                  }
                />
              </Form>
            </Formik>
          </div>
        </InnerWrapper>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  msg: state.msg,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(AddBook);
